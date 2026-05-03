import { motion } from 'framer-motion'
import { RiGithubLine, RiExternalLinkLine, RiStarLine, RiTimeLine } from 'react-icons/ri'

const CATEGORY_COLORS = {
  ML: { bg: 'rgba(14,165,233,0.12)', text: '#38bdf8', border: 'rgba(14,165,233,0.25)' },
  Data: { bg: 'rgba(139,92,246,0.12)', text: '#a78bfa', border: 'rgba(139,92,246,0.25)' },
  Web: { bg: 'rgba(52,211,153,0.12)', text: '#34d399', border: 'rgba(52,211,153,0.25)' },
}

function timeSince(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="h-4 bg-[var(--surface)] rounded w-2/3 mb-3" />
      <div className="h-3 bg-[var(--surface)] rounded w-full mb-2" />
      <div className="h-3 bg-[var(--surface)] rounded w-4/5 mb-6" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-[var(--surface)] rounded-full" />
        <div className="h-6 w-16 bg-[var(--surface)] rounded-full" />
      </div>
    </div>
  )
}

export default function ProjectCard({ repo, featured = false, index = 0 }) {
  const cat = repo.category || 'Web'
  const colors = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Web
  const desc = repo.description || 'No description available.'
  const name = repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`group glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--brand)] hover:shadow-xl hover:shadow-[var(--glow)] ${
        featured ? 'p-8' : 'p-6'
      }`}
    >
      {featured && (
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--brand)]">⭐ Featured Project</span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className={`font-display font-bold tracking-tight ${featured ? 'text-2xl' : 'text-lg'}`} style={{ color: 'var(--text)' }}>
          {name}
        </h3>
        <span
          className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
        >
          {cat}
        </span>
      </div>

      <p className={`text-[var(--text-2)] mb-5 leading-relaxed ${featured ? 'text-base' : 'text-sm'}`}>
        {desc}
      </p>

      {/* Language / tech badge */}
      <div className="flex flex-wrap gap-2 mb-5">
        {repo.language && (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono glass border border-[var(--border)] text-[var(--text-2)]">
            {repo.language}
          </span>
        )}
        {(repo.topics || []).slice(0, 3).map(t => (
          <span key={t} className="px-2.5 py-1 rounded-full text-xs font-mono glass border border-[var(--border)] text-[var(--text-3)]">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-[var(--text-3)]">
          <span className="flex items-center gap-1">
            <RiStarLine size={12} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <RiTimeLine size={12} />
            {timeSince(repo.updated_at)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl glass hover:border-[var(--brand)] hover:text-[var(--brand)] text-[var(--text-2)] transition-all duration-200"
            aria-label="GitHub"
          >
            <RiGithubLine size={16} />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl glass hover:border-[var(--brand)] hover:text-[var(--brand)] text-[var(--text-2)] transition-all duration-200"
              aria-label="Live demo"
            >
              <RiExternalLinkLine size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
