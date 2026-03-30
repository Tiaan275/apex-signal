import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET

function verifyAdmin(req: NextRequest): boolean {
  if (!ADMIN_SECRET) return false
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  return token === ADMIN_SECRET
}

// In-memory analytics store for Phase 1.
// Replace with Supabase table writes in Phase 2.
const analyticsStore: {
  event: string
  page?: string
  timestamp: string
}[] = []

/**
 * POST /api/admin/analytics
 * Records a client-side event (CTA click, section view, etc.)
 * No auth required — public endpoint for tracking.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { event, page } = body
    if (!event || typeof event !== 'string') {
      return NextResponse.json({ error: 'event required' }, { status: 400 })
    }
    analyticsStore.push({ event, page, timestamp: new Date().toISOString() })
    // Keep last 1000 events in memory
    if (analyticsStore.length > 1000) analyticsStore.shift()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

/**
 * GET /api/admin/analytics
 * Returns aggregated analytics. Admin-protected.
 */
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const counts: Record<string, number> = {}
  for (const entry of analyticsStore) {
    counts[entry.event] = (counts[entry.event] ?? 0) + 1
  }

  return NextResponse.json({
    total_events: analyticsStore.length,
    by_event: counts,
    recent: analyticsStore.slice(-20).reverse(),
    since: analyticsStore[0]?.timestamp ?? null,
  })
}
