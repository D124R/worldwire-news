import type { Article } from '@/lib/news'
import { ExternalLink } from 'lucide-react'

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3_600_000)
  if (h < 1) return 'agora há pouco'
  if (h < 24) return `há ${h}h`
  const d = Math.floor(h / 24)
  return `há ${d}d`
}

export function NewsCard({ article }: { article: Article }) {
  const isLink = article.url && article.url !== '#'
  const Wrapper = isLink ? 'a' : 'div'
  const linkProps = isLink
    ? { href: article.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...linkProps}
      className="group block rounded-lg border border-white/10 bg-card/70 p-3 transition-colors hover:border-primary/50 hover:bg-card"
    >
      <div className="flex gap-4">
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image || '/placeholder.svg'}
            alt=""
            crossOrigin="anonymous"
            className="h-20 w-28 shrink-0 rounded-md object-cover"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <h3 className="text-pretty font-medium leading-snug text-card-foreground group-hover:text-primary">
            {article.title}
          </h3>
          {article.description ? (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {article.description}
            </p>
          ) : null}
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/80">
              {article.source}
            </span>
            <span aria-hidden>·</span>
            <span>{timeAgo(article.publishedAt)}</span>
            {isLink ? (
              <ExternalLink className="ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            ) : null}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
