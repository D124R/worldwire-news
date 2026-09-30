'use client'

import useSWR from 'swr'
import { CategoryFilter } from './category-filter'
import { NewsCard } from './news-card'
import type { CategoryId } from '@/lib/countries'
import type { NewsResponse } from '@/lib/news'
import { Globe, Loader2, X } from 'lucide-react'

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error('Falha ao carregar notícias')
    return r.json() as Promise<NewsResponse>
  })

type Props = {
  countryCode: string | null
  category: CategoryId
  onCategoryChange: (c: CategoryId) => void
  onClose: () => void
}

export function NewsPanel({
  countryCode,
  category,
  onCategoryChange,
  onClose,
}: Props) {
  const key = countryCode
    ? `/api/news?country=${countryCode}&category=${category}`
    : null
  const { data, error, isLoading } = useSWR<NewsResponse>(key, fetcher, {
    revalidateOnFocus: false,
  })

  if (!countryCode) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_32px_rgba(56,189,248,0.12)]">
          <Globe className="size-8" aria-hidden="true" />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Explore o mundo
        </p>
        <h2 className="max-w-xs text-lg font-semibold text-foreground">
          Escolha um país para começar
        </h2>
        <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
          Clique em uma área destacada no mapa e acompanhe as notícias mais recentes.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <h2 className="truncate text-base font-semibold text-foreground">
            {data?.country ?? '...'}
          </h2>
          <span className="hidden text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:inline">News details</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar painel de notícias"
          className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </header>

      <div className="border-b border-white/10 px-4 py-2.5">
        <CategoryFilter value={category} onChange={onCategoryChange} />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Carregando notícias...
          </div>
        ) : error ? (
          <p className="py-16 text-center text-destructive">
            Não foi possível carregar as notícias. Tente novamente.
          </p>
        ) : (
          <>
            {data?.demo ? (
              <p className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">
                Exibindo dados de demonstração. Adicione a variável{' '}
                <code className="font-mono">GNEWS_API_KEY</code> para ver
                notícias reais.
              </p>
            ) : null}
            {data?.articles.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
