// Maps ISO 3166-1 numeric codes (used by the world-atlas topojson `geo.id`)
// to the alpha-2 country code and display name.
// Countries flagged `topHeadlines: true` are supported by GNews top-headlines;
// others fall back to a keyword search by country name.

export type CountryInfo = {
  code: string // alpha-2, lowercase
  name: string
  topHeadlines: boolean
}

export const COUNTRIES: Record<string, CountryInfo> = {
  '036': { code: 'au', name: 'Austrália', topHeadlines: true },
  '076': { code: 'br', name: 'Brasil', topHeadlines: true },
  '124': { code: 'ca', name: 'Canadá', topHeadlines: true },
  '156': { code: 'cn', name: 'China', topHeadlines: true },
  '818': { code: 'eg', name: 'Egito', topHeadlines: true },
  '250': { code: 'fr', name: 'França', topHeadlines: true },
  '276': { code: 'de', name: 'Alemanha', topHeadlines: true },
  '300': { code: 'gr', name: 'Grécia', topHeadlines: true },
  '344': { code: 'hk', name: 'Hong Kong', topHeadlines: true },
  '356': { code: 'in', name: 'Índia', topHeadlines: true },
  '372': { code: 'ie', name: 'Irlanda', topHeadlines: true },
  '376': { code: 'il', name: 'Israel', topHeadlines: true },
  '380': { code: 'it', name: 'Itália', topHeadlines: true },
  '392': { code: 'jp', name: 'Japão', topHeadlines: true },
  '528': { code: 'nl', name: 'Países Baixos', topHeadlines: true },
  '578': { code: 'no', name: 'Noruega', topHeadlines: true },
  '586': { code: 'pk', name: 'Paquistão', topHeadlines: true },
  '604': { code: 'pe', name: 'Peru', topHeadlines: true },
  '608': { code: 'ph', name: 'Filipinas', topHeadlines: true },
  '620': { code: 'pt', name: 'Portugal', topHeadlines: true },
  '642': { code: 'ro', name: 'Romênia', topHeadlines: true },
  '643': { code: 'ru', name: 'Rússia', topHeadlines: true },
  '702': { code: 'sg', name: 'Singapura', topHeadlines: true },
  '724': { code: 'es', name: 'Espanha', topHeadlines: true },
  '752': { code: 'se', name: 'Suécia', topHeadlines: true },
  '756': { code: 'ch', name: 'Suíça', topHeadlines: true },
  '158': { code: 'tw', name: 'Taiwan', topHeadlines: true },
  '804': { code: 'ua', name: 'Ucrânia', topHeadlines: true },
  '826': { code: 'gb', name: 'Reino Unido', topHeadlines: true },
  '840': { code: 'us', name: 'Estados Unidos', topHeadlines: true },
  // Extra countries (search fallback)
  '032': { code: 'ar', name: 'Argentina', topHeadlines: false },
  '484': { code: 'mx', name: 'México', topHeadlines: false },
  '152': { code: 'cl', name: 'Chile', topHeadlines: false },
  '170': { code: 'co', name: 'Colômbia', topHeadlines: false },
  '710': { code: 'za', name: 'África do Sul', topHeadlines: false },
  '566': { code: 'ng', name: 'Nigéria', topHeadlines: false },
  '410': { code: 'kr', name: 'Coreia do Sul', topHeadlines: false },
  '360': { code: 'id', name: 'Indonésia', topHeadlines: false },
  '764': { code: 'th', name: 'Tailândia', topHeadlines: false },
  '792': { code: 'tr', name: 'Turquia', topHeadlines: false },
  '682': { code: 'sa', name: 'Arábia Saudita', topHeadlines: false },
  '784': { code: 'ae', name: 'Emirados Árabes', topHeadlines: false },
  '616': { code: 'pl', name: 'Polônia', topHeadlines: false },
  '040': { code: 'at', name: 'Áustria', topHeadlines: false },
  '056': { code: 'be', name: 'Bélgica', topHeadlines: false },
}

export function getCountryByNumericId(id: string): CountryInfo | undefined {
  return COUNTRIES[id]
}

export const CATEGORIES = [
  { id: 'politics', label: 'Política', gnews: 'nation', color: 'politics' },
  { id: 'economy', label: 'Economia', gnews: 'business', color: 'economy' },
  {
    id: 'entertainment',
    label: 'Entretenimento',
    gnews: 'entertainment',
    color: 'entertainment',
  },
  { id: 'technology', label: 'Tecnologia', gnews: 'technology', color: 'technology' },
  { id: 'sports', label: 'Esportes', gnews: 'sports', color: 'sports' },
  { id: 'science', label: 'Ciência', gnews: 'science', color: 'science' },
  { id: 'health', label: 'Saúde', gnews: 'health', color: 'health' },
] as const

export type CategoryId = (typeof CATEGORIES)[number]['id']
// 'all' is a pseudo-category used by the news tabs to show breaking headlines.
export type NewsFilter = CategoryId | 'all'

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id)
}

export function gnewsTopic(category: string): string {
  return CATEGORIES.find((c) => c.id === category)?.gnews ?? 'general'
}
