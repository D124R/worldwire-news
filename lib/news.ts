export type Article = {
  id: string
  title: string
  description: string
  url: string
  image: string | null
  source: string
  publishedAt: string
}

export type NewsResponse = {
  country: string
  category: string
  articles: Article[]
  demo: boolean // true when returning mock data (no API key configured)
}

type Template = { title: string; desc: string; source: string }

const GENERIC_TEMPLATES: Template[] = [
  { title: 'Principais acontecimentos movimentam {country} nesta semana', desc: 'Uma seleção das notícias mais relevantes e comentadas do país.', source: 'Panorama' },
  { title: 'Especialistas analisam os rumos de {country}', desc: 'Debate reúne diferentes perspectivas sobre o cenário atual.', source: 'Análise Diária' },
  { title: 'O que está em alta em {country} hoje', desc: 'Resumo dos temas que dominam as conversas e as manchetes locais.', source: 'Resumo 24h' },
  { title: 'Cobertura especial: {country} em foco', desc: 'Reportagem aprofundada sobre os fatos que marcam o dia.', source: 'Correspondente' },
]

const DEMO_TEMPLATES: Partial<Record<string, Template[]>> = {
  politics: [
    { title: 'Parlamento aprova nova reforma administrativa em {country}', desc: 'A votação foi acompanhada de perto por analistas e movimentos sociais em todo o país.', source: 'Gazeta Nacional' },
    { title: 'Presidente de {country} anuncia mudanças no gabinete', desc: 'A reorganização ministerial busca responder às pressões econômicas dos últimos meses.', source: 'Diário Político' },
    { title: 'Oposição em {country} pede novas eleições', desc: 'Lideranças partidárias divergem sobre o calendário eleitoral e as regras de campanha.', source: 'Correio do Estado' },
    { title: 'Acordo diplomático fortalece relações de {country} na região', desc: 'O tratado prevê cooperação em segurança, comércio e intercâmbio cultural.', source: 'Panorama Global' },
  ],
  economy: [
    { title: 'Banco central de {country} mantém taxa de juros', desc: 'Decisão busca equilibrar controle da inflação com estímulo ao crescimento.', source: 'Mercado Diário' },
    { title: 'Exportações de {country} batem recorde no trimestre', desc: 'Setor de commodities e tecnologia puxou o desempenho positivo da balança comercial.', source: 'Economia Hoje' },
    { title: 'Startups de {country} atraem investimento bilionário', desc: 'Fundos internacionais apostam no ecossistema de inovação local.', source: 'Capital & Negócios' },
    { title: 'Inflação em {country} desacelera pelo terceiro mês', desc: 'Alívio nos preços de alimentos e energia ajudou a conter o índice geral.', source: 'Bolsa & Renda' },
  ],
  entertainment: [
    { title: 'Festival de cinema de {country} revela lista de indicados', desc: 'Produções independentes dominam as principais categorias deste ano.', source: 'Cena Cultural' },
    { title: 'Artista de {country} lidera paradas musicais globais', desc: 'O novo álbum quebrou recordes de streaming na primeira semana.', source: 'Vibe Mag' },
    { title: 'Série gravada em {country} vira fenômeno internacional', desc: 'A produção conquistou audiência e crítica em dezenas de países.', source: 'Tela & Cia' },
    { title: 'Turnê esgota estádios em {country}', desc: 'Ingressos foram vendidos em minutos, gerando shows extras na capital.', source: 'Backstage' },
  ],
}

export function buildDemoArticles(countryName: string, category: string): Article[] {
  const templates = DEMO_TEMPLATES[category] ?? GENERIC_TEMPLATES
  const now = Date.now()
  return templates.map((t, i) => ({
    id: `${category}-${i}`,
    title: t.title.replace('{country}', countryName),
    description: t.desc,
    url: '#',
    image: null,
    source: t.source,
    publishedAt: new Date(now - i * 3 * 60 * 60 * 1000).toISOString(),
  }))
}
