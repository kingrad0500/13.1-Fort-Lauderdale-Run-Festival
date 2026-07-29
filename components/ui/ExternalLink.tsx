import { resolveLink, getLink, type LinkId } from '@/content/links'
import { getPending, type PendingId } from '@/content/pending'
import { InlineNotice } from './StatusNotice'
import { cn } from '@/lib/cn'

/**
 * External link that degrades honestly. Brief §14, §16, §19.
 *
 * If the URL is unverified or missing, this renders a Coming soon notice
 * rather than a dead link or a disabled button — §19 forbids both.
 *
 * §16: link text must clearly identify the destination and indicate new-tab
 * behaviour. The visible label stays clean; the announcement is complete.
 * §14: a small external-service icon may reinforce the destination but must
 * not be the only indicator, so the text always carries it too.
 */
export function ExternalLinkOrNotice({
  id,
  fallbackPendingId,
  className,
  children,
}: {
  id: LinkId
  /** Overrides the link's own pendingLabel when a registry item fits better. */
  fallbackPendingId?: PendingId
  className?: string
  children?: React.ReactNode
}) {
  const link = resolveLink(id)

  if (!link) {
    if (fallbackPendingId) {
      const item = getPending(fallbackPendingId)
      return <InlineNotice className={className}>{item.label}</InlineNotice>
    }
    const { pendingLabel, label } = getLink(id)
    return (
      <InlineNotice className={className}>
        {pendingLabel ?? `${label} coming soon`}
      </InlineNotice>
    )
  }

  const newTab = link.target === 'new-tab'

  return (
    <a
      href={link.url!}
      className={cn(
        'inline-flex items-center gap-1.5 font-sans font-bold text-blue',
        'underline underline-offset-4 decoration-blue/40 hover:decoration-blue',
        'min-h-[44px] py-2',
        className,
      )}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children ?? link.label}
      {newTab && (
        <>
          <span aria-hidden="true" className="text-xs">
            ↗
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </a>
  )
}
