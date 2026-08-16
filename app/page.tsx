'use client'

import { useState } from 'react'
import { WorldMap } from '@/components/world-map'
import { NewsPanel } from '@/components/news-panel'
import { COUNTRIES, type CategoryId } from '@/lib/countries'
import { Globe2 } from 'lucide-react'

export default function Page() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [category, setCategory] = useState<CategoryId>('politics')

  function handleSelect(numericId: string) {
    const info = COUNTRIES[numericId]
    if (info) setSelectedCode(info.code)
  }

  return (
    <main className="flex min-h-dvh flex-col bg-background font-sans lg:h-dvh lg:overflow-hidden">
      <header className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Globe2 className="size-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold leading-tight text-foreground">
            Atlas de Notícias
          </h1>
          <p className="text-xs text-muted-foreground">
            O mundo inteiro em um mapa — política, economia e entretenimento
          </p>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_420px]">
        <section className="relative h-[55vh] border-b border-border lg:h-auto lg:border-b-0 lg:border-r">
          <WorldMap selectedCode={selectedCode} onSelect={handleSelect} />
        </section>

        <aside className="min-h-[60vh] bg-background/50 lg:min-h-0">
          <NewsPanel
            countryCode={selectedCode}
            category={category}
            onCategoryChange={setCategory}
            onClose={() => setSelectedCode(null)}
          />
        </aside>
      </div>
    </main>
  )
}
