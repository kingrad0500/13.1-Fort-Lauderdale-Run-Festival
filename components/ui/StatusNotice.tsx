import { getPending, type PendingId } from '@/content/pending'
import { cn } from '@/lib/cn'

/**
 * The one treatment for unavailable content. Brief §19.
 *
 * §19: "Do not display empty modules, inactive buttons, or invented temporary
 * content." §16: Coming soon states include TEXT, never icon or colour alone.
 *
 * Deliberately quiet. A pending item should read as a calm, honest note, not
 * as an error or a missing-content hole. It must never look like a button,
 * because it is not one.
 */

type Tone = 'quiet' | 'inline'

const stateLabels = {
  'coming-soon': 'Coming soon',
  'to-be-announced': 'To be announced',
  'registration-closed': 'Registration closed',
  updated: 'Updated',
} as const

export function StatusNotice({
  id,
  tone = 'quiet',
  className,
}: {
  id: PendingId
  tone?: Tone
  className?: string
}) {
  const item = getPending(id)
  if (item.resolved) return null

  return (
    <p
      className={cn(
        'font-sans text-sm text-navy/70',
        tone === 'quiet' &&
          'inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-navy/15 bg-sand-dark/60 px-4 py-2',
        tone === 'inline' && 'italic',
        className,
      )}
    >
      {/* Decorative. The status is carried by the text itself, per §16. */}
      {tone === 'quiet' && (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-navy/30" />
      )}
      <span className="sr-only">{stateLabels[item.state]}: </span>
      {item.label}
    </p>
  )
}

/**
 * For pending content that is not in the registry — one-off states such as a
 * provider being temporarily unreachable (§19 failure and fallback behaviour).
 */
export function InlineNotice({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-navy/15',
        'bg-sand-dark/60 px-4 py-2 font-sans text-sm text-navy/70',
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-navy/30" />
      {children}
    </p>
  )
}
