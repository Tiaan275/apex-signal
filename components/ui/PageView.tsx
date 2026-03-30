'use client'

import { usePageView } from '@/lib/analytics'

/**
 * Drop this into any page (server or client) to fire a page_view analytics event.
 * Renders nothing — purely a side-effect component.
 */
export default function PageView({ page }: { page: string }) {
  usePageView(page)
  return null
}
