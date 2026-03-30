import { NextRequest, NextResponse } from 'next/server'

// All env vars used here are server-side only.
// MAILERLITE_API_KEY and SUPABASE_SERVICE_ROLE_KEY are NEVER sent to the browser.
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID ?? '183309795863823756'
const MAILERLITE_API_BASE = 'https://connect.mailerlite.com/api'

function isValidEmail(email: unknown): email is string {
  return (
    typeof email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name } = body

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Reject obviously fake or test emails in production
    const cleanEmail = email.trim().toLowerCase()
    if (cleanEmail.endsWith('@example.com') || cleanEmail.endsWith('@test.com')) {
      return NextResponse.json({ error: 'Please use a real email address.' }, { status: 400 })
    }

    if (!MAILERLITE_API_KEY) {
      console.error('[waitlist] MAILERLITE_API_KEY is not set')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    // ─── 1. Upsert subscriber in MailerLite ──────────────────────────────
    const mlBody: Record<string, unknown> = {
      email: cleanEmail,
      status: 'active',
    }
    if (name && typeof name === 'string' && name.trim()) {
      mlBody.fields = { name: name.trim() }
    }

    const subscriberRes = await fetch(`${MAILERLITE_API_BASE}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(mlBody),
    })

    let subscriberData: Record<string, any> = {}
    try {
      subscriberData = await subscriberRes.json()
    } catch {
      // ignore parse error on non-JSON body
    }

    // 409 = duplicate subscriber — still extract their ID and continue
    if (!subscriberRes.ok && subscriberRes.status !== 409) {
      console.error('[waitlist] MailerLite subscriber error:', subscriberData)
      return NextResponse.json(
        { error: 'Could not add subscriber. Please try again.' },
        { status: 502 }
      )
    }

    const subscriberId: string | undefined =
      subscriberData?.data?.id ?? subscriberData?.id

    // ─── 2. Assign to Pre-Launch Waitlist group ───────────────────────────
    if (subscriberId) {
      const groupRes = await fetch(
        `${MAILERLITE_API_BASE}/subscribers/${subscriberId}/groups`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({ group_id: MAILERLITE_GROUP_ID }),
        }
      )
      if (!groupRes.ok) {
        // Non-fatal — subscriber created, log and continue
        console.warn('[waitlist] Failed to assign group:', await groupRes.text())
      }
    }

    // ─── 3. Log to Supabase (optional — skips gracefully if not configured) ──
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (supabaseUrl && serviceKey) {
        await fetch(`${supabaseUrl}/rest/v1/waitlist_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': serviceKey,
            'Authorization': `Bearer ${serviceKey}`,
            'Prefer': 'resolution=merge-duplicates',
          },
          body: JSON.stringify({
            email: cleanEmail,
            name: typeof name === 'string' && name.trim() ? name.trim() : null,
            source: 'landing_page',
          }),
        })
      }
    } catch (dbErr) {
      // DB logging is best-effort; don't fail the request
      console.warn('[waitlist] Supabase log skipped:', dbErr)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[waitlist] Unhandled error:', error)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
