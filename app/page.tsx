'use client'

import { useMemo, useState } from 'react'
import { Globe2, Search, Radio, SlidersHorizontal, X } from 'lucide-react'
import { WorldMap } from '@/components/world-map'
import { NewsPanel } from '@/components/news-panel'
import { CategoryFilter } from '@/components/category-filter'
import { COUNTRIES, CATEGORIES, type CategoryId } from '@/lib/countries'

export default function Page() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [category, setCategory] = useState<CategoryId>('politics')
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [query, setQuery] = useState('')

  function handleSelect(numericId: string) {
    const country = COUNTRIES[numericId]
    if (country) setSelectedCode(country.code)
  }

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return Object.values(COUNTRIES)
      .filter((country) => country.name.toLowerCase().includes(term) || country.code.includes(term))
      .slice(0, 5)
  }, [query])

  const selectedCountry = Object.values(COUNTRIES).find((country) => country.code === selectedCode)
  const activeCategory = CATEGORIES.find((item) => item.id === category)

  return (
    <main className="relative h-dvh overflow-hidden bg-[#08090a] font-sans text-foreground">
      <header className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-primary">
            <Globe2 className="size-4" aria-hidden="true" />
          </div>
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">World News Map</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setSearchOpen((open) => !open); setFilterOpen(false) }} className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/65 backdrop-blur transition-colors hover:border-white/20 hover:text-white" aria-label="Buscar países e notícias">
            <Search className="size-3.5" aria-hidden="true" /><span className="hidden sm:inline">Search</span>
          </button>
          <button onClick={() => { setFilterOpen((open) => !open); setSearchOpen(false) }} className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/65 backdrop-blur transition-colors hover:border-white/20 hover:text-white" aria-label="Abrir filtros">
            <SlidersHorizontal className="size-3.5" aria-hidden="true" /><span className="hidden sm:inline">Filter</span>
          </button>
          <div className="hidden items-center gap-1.5 px-2 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400 sm:flex"><Radio className="size-3" aria-hidden="true" /> Live</div>
        </div>
      </header>

      <section className="h-full w-full pt-2">
        <WorldMap selectedCode={selectedCode} onSelect={handleSelect} />
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center px-4">
        <div className="rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/45 backdrop-blur">
          {selectedCountry ? `${selectedCountry.name} selected` : 'Click a highlighted country'}
        </div>
      </div>

      {searchOpen ? (
        <div className="absolute right-4 top-16 z-40 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[#111315]/95 p-3 shadow-2xl backdrop-blur-xl sm:right-7">
          <div className="flex items-center gap-2 border-b border-white/10 px-2 pb-3">
            <Search className="size-4 text-white/45" aria-hidden="true" />
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search countries..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" aria-label="Buscar países" />
            <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white" aria-label="Fechar busca"><X className="size-4" /></button>
          </div>
          {matches.length > 0 ? <div className="mt-2 space-y-1">{matches.map((country) => <button key={country.code} onClick={() => { setSelectedCode(country.code); setSearchOpen(false); setQuery('') }} className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/70 hover:bg-white/[0.07] hover:text-white">{country.name}<span className="ml-2 text-xs text-white/30">{country.code.toUpperCase()}</span></button>)}</div> : <p className="px-2 pt-3 text-xs text-white/35">Type a country name or code.</p>}
        </div>
      ) : null}

      {filterOpen ? (
        <div className="absolute right-4 top-16 z-40 w-56 rounded-2xl border border-white/10 bg-[#111315]/95 p-4 shadow-2xl backdrop-blur-xl sm:right-7">
          <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Filter by topic</span><button onClick={() => setFilterOpen(false)} className="text-white/40 hover:text-white" aria-label="Fechar filtros"><X className="size-4" /></button></div>
          <CategoryFilter value={category} onChange={(value) => { setCategory(value); setFilterOpen(false) }} />
          <p className="mt-3 text-[11px] text-white/30">Showing {activeCategory?.label.toLowerCase()} stories.</p>
        </div>
      ) : null}

      {selectedCode ? <aside className="absolute inset-x-3 bottom-3 top-20 z-30 overflow-hidden rounded-2xl border border-white/10 bg-[#111315]/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-[380px]"><NewsPanel countryCode={selectedCode} category={category} onCategoryChange={setCategory} onClose={() => setSelectedCode(null)} /></aside> : null}
    </main>
  )
}
