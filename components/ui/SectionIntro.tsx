import { EyebrowLabel } from './EyebrowLabel'
import { cn } from '@/lib/cn'

/**
 * Standard section opening. Brief §15 reusable component system.
 *
 * Keeps eyebrow -> headline -> lede consistent everywhere so sections read as
 * one system rather than as individually designed pages.
 */
export function SectionIntro({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'ink',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  lede?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'ink' | 'inverse'
  className?: string
}) {
  return (
    <div
      className={cn(
        align === 'center' && 'mx-auto text-center',
        align === 'center' ? 'max-w-3xl' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <EyebrowLabel tone={tone === 'inverse' ? 'accent' : 'ink'}>
          {eyebrow}
        </EyebrowLabel>
      )}

      <h2
        className={cn(
          'mt-4 text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em]',
          tone === 'ink' ? 'text-navy' : 'text-sand',
        )}
      >
        {title}
      </h2>

      {lede && (
        <p
          className={cn(
            'measure mt-5 font-sans text-lg leading-relaxed',
            align === 'center' && 'mx-auto',
            tone === 'ink' ? 'text-navy/75' : 'text-sand/80',
          )}
        >
          {lede}
        </p>
      )}
    </div>
  )
}

/** Consistent vertical rhythm. Brief §15: generous, alternating space. */
export function Section({
  children,
  surface = 'sand',
  className,
  ...rest
}: {
  children: React.ReactNode
  surface?: 'sand' | 'paper' | 'navy'
  className?: string
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        'py-20 sm:py-28',
        surface === 'paper' && 'bg-paper',
        surface === 'navy' && 'bg-navy surface-inverse',
        className,
      )}
      {...rest}
    >
      <div className="page-shell">{children}</div>
    </section>
  )
}
