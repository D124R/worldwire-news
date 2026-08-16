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
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <Globe className="size-10 text-muted-foreground" />
        <p className="text-balance text-muted-foreground">
          Selecione um país no mapa para ver as notícias mais recentes.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-start justify-between gap-3 border-b border-border p-5">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-primary">
            Cobertura ao vivo
          </p>
          <h2 className="truncate text-2xl font-semibold text-foreground">
            {data?.country ?? '...'}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar painel de notícias"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </header>

      <div className="border-b border-border p-5">
        <CategoryFilter value={category} onChange={onCategoryChange} />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-5">
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
