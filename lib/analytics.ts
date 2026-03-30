'use client'

import { useEffect } from 'react'

/**
 * Apex Signal — client-side analytics helper.
 * Fire-and-forget: sends events to /api/admin/analytics.
 * No PII is ever sent — only event names and page slugs.
 */
export function track(event: string, page?: string): void {
  // Guard against accidental server-side calls
  if (typeof window === 'undefined') return

  try {
    fetch('/api/admin/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        page: page ?? window.location.pathname,
      }),
    }).catch(() => {
      // Silently fail — analytics must never break the UI
    })
  } catch {
    // noop
  }
}

/**
 * Hook: call once per page to track a page_view event on mount.
 * Use inside client components only.
 */
export function usePageView(pageName: string): void {
  useEffect(() => {
    track(EVENTS.PAGE_VIEW, pageName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// ─── Predefined event names (keep in sync with /api/admin/analytics) ─────────
export const EVENTS = {
  // Page views
  PAGE_VIEW:              'page_view',

  // Hero
  HERO_PRIMARY_CTA:       'hero_primary_cta',
  HERO_SECONDARY_CTA:     'hero_secondary_cta',

  // Waitlist
  WAITLIST_SUBMIT:        'waitlist_submit',
  WAITLIST_SUCCESS:       'waitlist_success',

  // Features
  FEATURES_TAB_CLICK:     'features_tab_click',

  // Contact
  CONTACT_SUBMIT:         'contact_submit',
  CONTACT_SUCCESS:        'contact_success',

  // Nav
  NAVBAR_CTA_CLICK:       'navbar_cta_click',

  // Pricing
  PRICING_CTA_CLICK:      'pricing_cta_click',
} as const

export type EventName = (typeof EVENTS)[keyof typeof EVENTS]
