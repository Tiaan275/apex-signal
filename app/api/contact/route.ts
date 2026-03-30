import { NextRequest, NextResponse } from 'next/server'

// All processing is server-side. No secrets are exposed to the client.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function isValidEmail(email: string): boolean {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // ─── Validation ───────────────────────────────────────────────────────
    const errors: string[] = []
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters.')
    }
    if (!email || !isValidEmail(email)) {
      errors.push('A valid email address is required.')
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      errors.push('Subject must be at least 3 characters.')
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.push('Message must be at least 10 characters.')
    }
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(' ') }, { status: 400 })
    }

    const cleaned = {
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    }

    // ─── Save to Supabase ──────────────────────────────────────────────────
    // Gracefully skips if DB is not yet configured.
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      try {
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify(cleaned),
        })

        if (!dbRes.ok) {
          const errText = await dbRes.text()
          console.warn('[contact] Supabase insert failed:', errText)
          // Non-fatal — still return success to user
        }
      } catch (dbErr) {
        console.warn('[contact] Supabase unavailable:', dbErr)
      }
    } else {
      // Log locally when DB is not configured (dev mode)
      console.info('[contact] Submission (DB not configured):', cleaned)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[contact] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}
