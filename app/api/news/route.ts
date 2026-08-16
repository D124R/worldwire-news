import { type NextRequest, NextResponse } from 'next/server'
import { COUNTRIES, gnewsTopic } from '@/lib/countries'
import { buildDemoArticles, type Article, type NewsResponse } from '@/lib/news'

export const runtime = 'nodejs'
export const revalidate = 600 // cache upstream results for 10 minutes

function findCountryByCode(code: string) {
  return Object.values(COUNTRIES).find((c) => c.code === code)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = (searchParams.get('country') ?? '').toLowerCase()
  const category = searchParams.get('category') ?? 'all'

  const country = findCountryByCode(code)
  if (!country) {
    return NextResponse.json({ error: 'País não suportado' }, { status: 400 })
  }

  const apiKey = process.env.GNEWS_API_KEY
  const base: Omit<NewsResponse, 'articles' | 'demo'> = {
    country: country.name,
    category,
  }

  // No API key -> serve demo data so the UI is fully functional.
  if (!apiKey) {
    return NextResponse.json({
      ...base,
      articles: buildDemoArticles(country.name, category),
      demo: true,
    } satisfies NewsResponse)
  }

  try {
    const topic = gnewsTopic(category)
    let endpoint: string
    if (country.topHeadlines) {
      endpoint = `https://gnews.io/api/v4/top-headlines?country=${country.code}&topic=${topic}&lang=&max=10&apikey=${apiKey}`
    } else {
      // Unsupported by top-headlines: keyword search by country + topic.
      const q = encodeURIComponent(`${country.name} ${topic}`)
      endpoint = `https://gnews.io/api/v4/search?q=${q}&max=10&apikey=${apiKey}`
    }

    const res = await fetch(endpoint, { next: { revalidate: 600 } })
    if (!res.ok) {
      throw new Error(`GNews respondeu ${res.status}`)
    }
    const data = (await res.json()) as {
      articles?: Array<{
        title: string
        description: string
        url: string
        image: string | null
        publishedAt: string
        source: { name: string }
      }>
    }

    const articles: Article[] = (data.articles ?? []).map((a, i) => ({
      id: `${category}-${i}-${a.url}`,
      title: a.title,
      description: a.description ?? '',
      url: a.url,
      image: a.image ?? null,
      source: a.source?.name ?? 'Fonte desconhecida',
      publishedAt: a.publishedAt,
    }))

    // If the real API returns nothing, fall back to demo so the panel isn't empty.
    if (articles.length === 0) {
      return NextResponse.json({
        ...base,
        articles: buildDemoArticles(country.name, category),
        demo: true,
      } satisfies NewsResponse)
    }

    return NextResponse.json({ ...base, articles, demo: false } satisfies NewsResponse)
  } catch (err) {
    console.log('[v0] GNews fetch failed:', (err as Error).message)
    return NextResponse.json({
      ...base,
      articles: buildDemoArticles(country.name, category),
      demo: true,
    } satisfies NewsResponse)
  }
}
