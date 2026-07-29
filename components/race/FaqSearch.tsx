'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { FaqCategory } from '@/content/faq'
import { faqSearchPlaceholder } from '@/content/faq'
import { getPending, type PendingId } from '@/content/pending'
import { event } from '@/content/race'
import { Accordion } from '@/components/ui/Accordion'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { cn } from '@/lib/cn'
import { send } from '@/lib/analytics'

/**
 * FAQ search and accordions. Brief §13.
 *
 * §13's interaction rules, all implemented:
 *  - accordions grouped by category
 *  - only one answer open at a time (native <details name>, see Accordion)
 *  - every question has a direct URL anchor
 *  - search filters questions immediately
 *
 * From the UX database:
 *  - "No Results": never a blank screen or a bare "0 results" — show a message
 *    WITH suggestions. Here that means offering the popular questions and a
 *    contact route rather than a dead end.
 *  - "Deep Linking": URLs reflect state, so landing on /faq#can-i-walk clears
 *    any filter and opens that question.
 *
 * PRIVACY (§18): the search analytics event carries the query LENGTH only,
 * never the query text, which can contain personal detail.
 *
 * WITHOUT JAVASCRIPT the search field is hidden (it could not work) and every
 * question renders open-able and anchored — §19.
 */
export function FaqSearch({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState('')
  const [ready, setReady] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const trackTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // The field only appears once JS is running, so it is never a dead control.
  useEffect(() => setReady(true), [])

  // Deep link: opening /faq#question-id must clear any filter and reveal it.
  useEffect(() => {
    function revealFromHash() {
      const id = window.location.hash.replace('#', '')
      if (!id) return
      setQuery('')
      // Wait for the unfiltered list to render before opening the target.
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el instanceof HTMLDetailsElement) {
          el.open = true
          el.scrollIntoView({ block: 'start' })
        }
      })
    }
    revealFromHash()
    window.addEventListener('hashchange', revealFromHash)
    return () => window.removeEventListener('hashchange', revealFromHash)
  }, [])

  const normalised = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!normalised) return categories
    return categories
      .map((category) => ({
        ...category,
        questions: category.questions.filter((q) => {
          const haystack = [
            q.question,
            ...q.answer,
            q.pendingId ? getPending(q.pendingId).label : '',
          ]
            .join(' ')
            .toLowerCase()
          return haystack.includes(normalised)
        }),
      }))
      .filter((category) => category.questions.length > 0)
  }, [categories, normalised])

  const resultCount = filtered.reduce((n, c) => n + c.questions.length, 0)

  function onChange(value: string) {
    setQuery(value)
    // Debounced, and length-only per §18.
    if (trackTimer.current) clearTimeout(trackTimer.current)
    trackTimer.current = setTimeout(() => {
      if (value.trim().length > 2) {
        send({ name: 'faq_search', query_length: value.trim().length })
      }
    }, 600)
  }

  return (
    <div>
      {ready && (
        <div className="mx-auto max-w-2xl">
          <label htmlFor="faq-search" className="eyebrow text-blue">
            Search
          </label>
          <div className="relative mt-3">
            <input
              ref={inputRef}
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => onChange(e.target.value)}
              placeholder={faqSearchPlaceholder}
              autoComplete="off"
              className={cn(
                'w-full rounded-[var(--radius-input)] border-2 border-navy/15 bg-paper',
                'px-5 py-4 pr-12 font-sans text-base text-navy',
                'placeholder:text-navy/45',
                'focus:border-blue focus:outline-none',
              )}
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  inputRef.current?.focus()
                }}
                className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-navy/60 hover:bg-navy/8 hover:text-navy"
              >
                <span className="sr-only">Clear search</span>
                <span aria-hidden="true" className="text-lg leading-none">
                  ×
                </span>
              </button>
            )}
          </div>

          {/* Result count announced politely, not on every keystroke. */}
          <p aria-live="polite" className="mt-3 min-h-[1.5rem] font-sans text-sm text-navy/60">
            {normalised
              ? `${resultCount} ${resultCount === 1 ? 'question' : 'questions'} match “${query.trim()}”`
              : ''}
          </p>
        </div>
      )}

      {/* No results — a route forward, never a dead end. */}
      {normalised && resultCount === 0 && (
        <div className="mx-auto mt-10 max-w-2xl rounded-[var(--radius-card)] bg-paper p-8 text-center shadow-[var(--shadow-card)]">
          <h2 className="font-display text-2xl font-bold text-navy">
            No questions match “{query.trim()}”
          </h2>
          <p className="measure mx-auto mt-3 font-sans text-[1.0625rem] leading-relaxed text-navy/70">
            Try a shorter word like <strong>packet</strong>,{' '}
            <strong>parking</strong>, <strong>walk</strong> or{' '}
            <strong>refund</strong> — or ask us directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-pill)] border-2 border-navy px-6 font-sans text-sm font-bold text-navy hover:bg-navy hover:text-sand"
            >
              Show all questions
            </button>
            <a
              href={`mailto:${event.contactEmail}`}
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-pill)] bg-coral px-6 font-sans text-sm font-bold text-navy hover:bg-coral-dark"
            >
              Email the race team
            </a>
          </div>
        </div>
      )}

      <div className="mt-14 space-y-14">
        {filtered.map((category) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className="scroll-mt-40"
          >
            <EyebrowLabel>{category.title}</EyebrowLabel>
            <h2
              id={`${category.id}-heading`}
              className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl"
            >
              {category.title}
            </h2>

            <div className="mt-6 border-t border-navy/12">
              {category.questions.map((q) => (
                <Accordion
                  key={q.id}
                  id={q.id}
                  group={`faq-${category.id}`}
                  question={q.question}
                >
                  {q.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {q.pendingId && <PendingAnswer id={q.pendingId} />}

                  {q.link && (
                    <p className="pt-1">
                      <a
                        href={q.link.href}
                        className="font-semibold text-blue underline underline-offset-4"
                      >
                        {q.link.label}
                      </a>
                    </p>
                  )}

                  <p className="pt-2">
                    <a
                      href={`#${q.id}`}
                      className="font-sans text-sm text-navy/50 underline underline-offset-4 hover:text-navy"
                    >
                      Link to this answer
                    </a>
                  </p>
                </Accordion>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function PendingAnswer({ id }: { id: PendingId }) {
  const item = getPending(id)
  if (item.resolved) return null
  return (
    <p className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-navy/15 bg-sand-dark/60 px-4 py-2 font-sans text-sm text-navy/70">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-navy/30" />
      {item.label}
    </p>
  )
}
