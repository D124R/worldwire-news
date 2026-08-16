# Atlas de Notícias

Um dashboard interativo de notícias globais construído com Next.js, React e TailwindCSS. Explore notícias de países ao redor do mundo organizadas por categoria em um mapa mundial interativo.

## Visão Geral

**Atlas de Notícias** é uma aplicação web moderna que apresenta um mapa-múndi interativo onde você pode:

- 🌍 Clicar em países para ver as notícias mais recentes daquela região
- 📰 Filtrar notícias por categoria (Política, Economia, Tecnologia, Entretenimento, Esportes, Ciência, Saúde)
- 🎯 Explorar cobertura ao vivo de 40+ países
- 🎨 Interface premium com tema dark editorial

O projeto integra com a API GNews para trazer notícias reais e atualizadas em tempo real.

## Características

- **Mapa Mundial Interativo**: Visualize a disponibilidade de cobertura por país
- **Filtros por Categoria**: Refine as notícias por tópico
- **Integração com API de Notícias**: Acesso a manchetes e artigos reais
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Tema Dark Premium**: Interface moderna e elegante
- **Performance Otimizada**: Built com Next.js 16 e TailwindCSS 4

## Stack Tecnológico

- **Frontend**: React 18 + Next.js 16
- **Styling**: TailwindCSS 4 + PostCSS
- **Componentes**: Lucide React Icons
- **Mapas**: react-simple-maps (D3.js baseado)
- **Data Fetching**: SWR para caching inteligente
- **API de Notícias**: GNews API
- **Linguagem**: TypeScript

## Como Começar

### Pré-requisitos

- Node.js 20+ ou superior
- npm ou pnpm

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/D124R/worldwire-news.git
cd worldwire-news
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Configure a variável de ambiente (opcional):
```bash
# Crie um arquivo .env.local
NEXT_PUBLIC_GNEWS_API_KEY=sua_chave_api_aqui
```

Se não configurar a API key, o app mostrará dados de demonstração.

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
pnpm dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

```
.
├── app/
│   ├── api/
│   │   └── news/
│   │       └── route.ts         # Endpoint da API de notícias
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Home page
├── components/
│   ├── world-map.tsx            # Componente do mapa interativo
│   ├── news-panel.tsx           # Painel de notícias
│   ├── news-card.tsx            # Card individual de notícia
│   ├── category-filter.tsx      # Filtro de categorias
│   └── ui/
│       └── button.tsx           # Componentes UI base
├── lib/
│   ├── countries.ts             # Dados de países e categorias
│   ├── country-meta.ts          # Metadados adicionais
│   ├── news.ts                  # Tipos e utilitários de notícias
│   └── utils.ts                 # Funções utilitárias
├── public/                       # Assets estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

## Uso

### Explorar Notícias

1. Abra a aplicação no navegador
2. Clique em um país no mapa para ver as notícias
3. Use os filtros de categoria para refinar os resultados
4. Clique em um artigo para ler na fonte original

### Desenvolver

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Execute a build de produção
npm run start

# Executar linter
npm run lint
```

## Variáveis de Ambiente

```bash
# .env.local
NEXT_PUBLIC_GNEWS_API_KEY=sua_chave_gnews_aqui
```

Obtenha uma chave gratuita em: https://gnews.io

## Países Suportados

O app suporta cobertura de mais de 40 países, incluindo:

- Brasil, Argentina, México, Canada
- Estados Unidos, Reino Unido, França, Alemanha, Itália
- Espanha, Portugal, Suíça, Suécia, Noruega
- Austrália, China, Japão, Coreia do Sul, Índia
- E mais...

## Performance

- Mapa renderizado com react-simple-maps (D3.js)
- Caching inteligente com SWR
- Otimizações de imagem com Next.js Image
- CSS crítico inlined para melhor LCP

## Deploy

### Vercel (Recomendado)

```bash
# Clone seu repositório e deploy automaticamente
vercel
```

### GitHub Pages

GitHub Pages pode servir a build estática do Next.js:

```bash
npm run build
npm run export
```

### Docker

```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## Autor

**Davi Ribeiro**
- GitHub: [@D124R](https://github.com/D124R)

## Contribuindo

Contribuições são bem-vindas! Sinta-se livre para fazer um fork, criar uma branch com suas features e enviar um pull request.

## Roadmap

- [ ] Comparação entre países
- [ ] Timeline de notícias por data
- [ ] Favoritos salvos localmente
- [ ] Notificações personalizadas
- [ ] Modo claro/escuro toggle
- [ ] Suporte para mais idiomas
- [ ] Busca global de notícias
- [ ] Análise de tendências

## Suporte

Se encontrar problemas ou tiver sugestões, abra uma [issue](https://github.com/D124R/worldwire-news/issues) no GitHub.

---

**Atlas de Notícias** © 2026. O mundo inteiro em um mapa — política, economia e entretenimento.
