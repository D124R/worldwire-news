import { COUNTRIES } from './countries'

export type CountryMeta = {
  region: string
  population: string
  capital: string
  currency: string
  language: string
  gdp: string
  coords: [number, number] // [lng, lat]
  activity: number // 0..1 relative news volume (drives heatmap + markers)
}

// Convert a lowercase alpha-2 code into its emoji flag.
export function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
}

export const COUNTRY_META: Record<string, CountryMeta> = {
  br: { region: 'América do Sul', population: '215 milhões', capital: 'Brasília', currency: 'Real (R$)', language: 'Português', gdp: 'US$ 2,17 tri', coords: [-51, -10], activity: 0.82 },
  us: { region: 'América do Norte', population: '332 milhões', capital: 'Washington, D.C.', currency: 'Dólar (US$)', language: 'Inglês', gdp: 'US$ 26,9 tri', coords: [-98, 39], activity: 1 },
  ca: { region: 'América do Norte', population: '39 milhões', capital: 'Ottawa', currency: 'Dólar canadense', language: 'Inglês / Francês', gdp: 'US$ 2,1 tri', coords: [-106, 56], activity: 0.55 },
  mx: { region: 'América do Norte', population: '128 milhões', capital: 'Cidade do México', currency: 'Peso mexicano', language: 'Espanhol', gdp: 'US$ 1,7 tri', coords: [-102, 23], activity: 0.6 },
  ar: { region: 'América do Sul', population: '46 milhões', capital: 'Buenos Aires', currency: 'Peso argentino', language: 'Espanhol', gdp: 'US$ 641 bi', coords: [-64, -34], activity: 0.58 },
  cl: { region: 'América do Sul', population: '19 milhões', capital: 'Santiago', currency: 'Peso chileno', language: 'Espanhol', gdp: 'US$ 335 bi', coords: [-71, -33], activity: 0.4 },
  co: { region: 'América do Sul', population: '52 milhões', capital: 'Bogotá', currency: 'Peso colombiano', language: 'Espanhol', gdp: 'US$ 363 bi', coords: [-74, 4], activity: 0.45 },
  pe: { region: 'América do Sul', population: '34 milhões', capital: 'Lima', currency: 'Sol', language: 'Espanhol', gdp: 'US$ 268 bi', coords: [-76, -10], activity: 0.38 },
  gb: { region: 'Europa', population: '67 milhões', capital: 'Londres', currency: 'Libra (£)', language: 'Inglês', gdp: 'US$ 3,3 tri', coords: [-1.5, 53], activity: 0.9 },
  fr: { region: 'Europa', population: '68 milhões', capital: 'Paris', currency: 'Euro (€)', language: 'Francês', gdp: 'US$ 3,0 tri', coords: [2, 47], activity: 0.85 },
  de: { region: 'Europa', population: '84 milhões', capital: 'Berlim', currency: 'Euro (€)', language: 'Alemão', gdp: 'US$ 4,4 tri', coords: [10, 51], activity: 0.88 },
  es: { region: 'Europa', population: '48 milhões', capital: 'Madri', currency: 'Euro (€)', language: 'Espanhol', gdp: 'US$ 1,4 tri', coords: [-4, 40], activity: 0.62 },
  it: { region: 'Europa', population: '59 milhões', capital: 'Roma', currency: 'Euro (€)', language: 'Italiano', gdp: 'US$ 2,1 tri', coords: [12, 42], activity: 0.6 },
  pt: { region: 'Europa', population: '10 milhões', capital: 'Lisboa', currency: 'Euro (€)', language: 'Português', gdp: 'US$ 276 bi', coords: [-8, 39.5], activity: 0.42 },
  nl: { region: 'Europa', population: '17 milhões', capital: 'Amsterdã', currency: 'Euro (€)', language: 'Holandês', gdp: 'US$ 1,1 tri', coords: [5.5, 52], activity: 0.5 },
  ru: { region: 'Europa / Ásia', population: '144 milhões', capital: 'Moscou', currency: 'Rublo', language: 'Russo', gdp: 'US$ 2,2 tri', coords: [90, 62], activity: 0.78 },
  ua: { region: 'Europa', population: '38 milhões', capital: 'Kiev', currency: 'Grívnia', language: 'Ucraniano', gdp: 'US$ 160 bi', coords: [31, 49], activity: 0.72 },
  pl: { region: 'Europa', population: '38 milhões', capital: 'Varsóvia', currency: 'Złoty', language: 'Polonês', gdp: 'US$ 688 bi', coords: [19, 52], activity: 0.48 },
  se: { region: 'Europa', population: '10 milhões', capital: 'Estocolmo', currency: 'Coroa sueca', language: 'Sueco', gdp: 'US$ 593 bi', coords: [15, 62], activity: 0.4 },
  cn: { region: 'Ásia', population: '1,41 bilhão', capital: 'Pequim', currency: 'Yuan (¥)', language: 'Mandarim', gdp: 'US$ 17,7 tri', coords: [104, 35], activity: 0.95 },
  jp: { region: 'Ásia', population: '125 milhões', capital: 'Tóquio', currency: 'Iene (¥)', language: 'Japonês', gdp: 'US$ 4,2 tri', coords: [138, 36], activity: 0.8 },
  in: { region: 'Ásia', population: '1,43 bilhão', capital: 'Nova Délhi', currency: 'Rúpia', language: 'Hindi / Inglês', gdp: 'US$ 3,7 tri', coords: [79, 22], activity: 0.85 },
  kr: { region: 'Ásia', population: '52 milhões', capital: 'Seul', currency: 'Won', language: 'Coreano', gdp: 'US$ 1,7 tri', coords: [128, 36], activity: 0.6 },
  id: { region: 'Ásia', population: '277 milhões', capital: 'Jacarta', currency: 'Rúpia indonésia', language: 'Indonésio', gdp: 'US$ 1,3 tri', coords: [113, -2], activity: 0.5 },
  th: { region: 'Ásia', population: '72 milhões', capital: 'Bangcoc', currency: 'Baht', language: 'Tailandês', gdp: 'US$ 512 bi', coords: [101, 15], activity: 0.4 },
  tr: { region: 'Europa / Ásia', population: '85 milhões', capital: 'Ancara', currency: 'Lira turca', language: 'Turco', gdp: 'US$ 906 bi', coords: [35, 39], activity: 0.55 },
  sa: { region: 'Oriente Médio', population: '36 milhões', capital: 'Riade', currency: 'Rial saudita', language: 'Árabe', gdp: 'US$ 1,1 tri', coords: [45, 24], activity: 0.5 },
  ae: { region: 'Oriente Médio', population: '9,4 milhões', capital: 'Abu Dhabi', currency: 'Dirham', language: 'Árabe', gdp: 'US$ 507 bi', coords: [54, 24], activity: 0.45 },
  il: { region: 'Oriente Médio', population: '9,5 milhões', capital: 'Jerusalém', currency: 'Novo shekel', language: 'Hebraico', gdp: 'US$ 522 bi', coords: [35, 31], activity: 0.7 },
  eg: { region: 'África', population: '111 milhões', capital: 'Cairo', currency: 'Libra egípcia', language: 'Árabe', gdp: 'US$ 476 bi', coords: [30, 27], activity: 0.5 },
  za: { region: 'África', population: '60 milhões', capital: 'Pretória', currency: 'Rand', language: 'Inglês / Zulu', gdp: 'US$ 399 bi', coords: [24, -29], activity: 0.48 },
  ng: { region: 'África', population: '224 milhões', capital: 'Abuja', currency: 'Naira', language: 'Inglês', gdp: 'US$ 477 bi', coords: [8, 9], activity: 0.5 },
  au: { region: 'Oceania', population: '26 milhões', capital: 'Camberra', currency: 'Dólar australiano', language: 'Inglês', gdp: 'US$ 1,7 tri', coords: [134, -25], activity: 0.62 },
}

const FALLBACK: CountryMeta = {
  region: '—',
  population: '—',
  capital: '—',
  currency: '—',
  language: '—',
  gdp: '—',
  coords: [0, 0],
  activity: 0.3,
}

export function getMeta(code: string): CountryMeta {
  return COUNTRY_META[code] ?? FALLBACK
}

// Markers rendered on the map (only countries that have coordinates).
export const MAP_MARKERS = Object.values(COUNTRIES)
  .filter((c) => COUNTRY_META[c.code])
  .map((c) => ({
    code: c.code,
    name: c.name,
    coords: COUNTRY_META[c.code].coords,
    activity: COUNTRY_META[c.code].activity,
  }))

// Heatmap color from activity: cool blue (low) -> red (high).
export function activityColor(activity: number, alpha = 1): string {
  const hue = 250 - activity * 225 // 250 (blue) down to 25 (red)
  const light = 0.5 + activity * 0.12
  const chroma = 0.13 + activity * 0.07
  return `oklch(${light} ${chroma} ${hue} / ${alpha})`
}
