import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID ?? '183309795863823756'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function verifyAdmin(req: NextRequest): boolean {
  if (!ADMIN_SECRET) return false
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '')
  return token === ADMIN_SECRET
}

/**
 * GET /api/admin/waitlist
 * Returns the subscriber list from MailerLite group + basic analytics.
 * Protected by ADMIN_SECRET bearer token.
 */
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized()

  try {
    if (!MAILERLITE_API_KEY) {
      return NextResponse.json({ error: 'MAILERLITE_API_KEY not configured' }, { status: 500 })
    }

    const [subscribersRes, countRes] = await Promise.all([
      fetch(
        `https://connect.mailerlite.com/api/groups/${MAILERLITE_GROUP_ID}/subscribers?limit=50&sort=-created_at`,
        {
          headers: {
            Authorization: `Bearer ${MAILERLITE_API_KEY}`,
            Accept: 'application/json',
          },
        }
      ),
      fetch(
        `https://connect.mailerlite.com/api/groups/${MAILERLITE_GROUP_ID}`,
        {
          headers: {
            Authorization: `Bearer ${MAILERLITE_API_KEY}`,
            Accept: 'application/json',
          },
        }
      ),
    ])

    const [subscribersData, countData] = await Promise.all([
      subscribersRes.json(),
      countRes.json(),
    ])

    const subscribers = (subscribersData?.data ?? []).map((s: any) => ({
      id: s.id,
      email: s.email,
      name: s.fields?.name ?? null,
      status: s.status,
      joined: s.created_at,
    }))

    return NextResponse.json({
      total: countData?.data?.active_count ?? subscribers.length,
      subscribers,
      fetched_at: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[admin/waitlist]', err)
    return NextResponse.json({ error: 'Failed to fetch waitlist' }, { status: 500 })
  }
}
