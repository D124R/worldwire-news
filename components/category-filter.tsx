'use client'

import { CATEGORIES, type CategoryId } from '@/lib/countries'
import { cn } from '@/lib/utils'

const ACCENT: Record<CategoryId, string> = {
  politics: 'data-[active=true]:bg-politics data-[active=true]:text-background',
  economy: 'data-[active=true]:bg-economy data-[active=true]:text-background',
  entertainment:
    'data-[active=true]:bg-entertainment data-[active=true]:text-background',
}

type Props = {
  value: CategoryId
  onChange: (c: CategoryId) => void
}

export function CategoryFilter({ value, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar notícias por categoria"
      className="flex w-full gap-1.5 overflow-x-auto"
    >
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          role="tab"
          aria-selected={value === c.id}
          data-active={value === c.id}
          onClick={() => onChange(c.id)}
          className={cn(
            'h-7 shrink-0 rounded-full border border-border px-2.5 text-[11px] font-medium transition-colors',
            'text-muted-foreground hover:text-foreground',
            ACCENT[c.id],
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
