import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiGithubLine } from 'react-icons/ri'
import SectionTitle from '../components/SectionTitle'
import ProjectCard, { ProjectCardSkeleton } from '../components/ProjectCard'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { PROJECT_FILTERS, personalInfo } from '../utils/data'

export default function Projects() {
  const { repos, featured, loading, error } = useGitHubRepos('sahil-gaund03')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? repos
    : repos.filter(r => r.category === activeFilter)

  return (
    <section id="projects" className="relative">
      <div className="section-padding">
        <SectionTitle
          label="My Work"
          title="Projects"
          subtitle="Real-world ML systems and data science solutions, fetched live from GitHub"
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PROJECT_FILTERS.map(f => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-xl font-display font-semibold text-sm transition-all duration-200 ${
                activeFilter === f
                  ? 'text-white shadow-lg'
                  : 'glass border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text)]'
              }`}
              style={activeFilter === f ? {
                background: 'linear-gradient(135deg, var(--brand), var(--accent))',
                boxShadow: '0 0 20px var(--glow)',
              } : {}}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {error && (
          <div className="text-center py-12 glass rounded-2xl border border-red-500/20 mb-8">
            <p className="text-red-400 text-sm">Failed to load GitHub repos: {error}</p>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[var(--brand)] hover:underline text-sm">
              <RiGithubLine /> View GitHub directly
            </a>
          </div>
        )}

        {/* Featured */}
        {(loading || featured) && activeFilter === 'All' && (
          <div className="mb-8">
            {loading ? (
              <div className="glass rounded-2xl p-8 animate-pulse">
                <div className="h-3 bg-[var(--surface)] rounded w-1/4 mb-4" />
                <div className="h-6 bg-[var(--surface)] rounded w-1/2 mb-3" />
                <div className="h-4 bg-[var(--surface)] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[var(--surface)] rounded w-2/3" />
              </div>
            ) : featured && (
              <ProjectCard repo={featured} featured index={0} />
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
              : filtered.map((repo, i) => (
                  <ProjectCard key={repo.id} repo={repo} index={i} />
                ))
            }
          </AnimatePresence>
        </div>

        {!loading && filtered.length === 0 && !error && (
          <div className="text-center py-12 text-[var(--text-3)]">
            No projects in this category yet.
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-[var(--border)] hover:border-[var(--brand)] text-[var(--text-2)] hover:text-[var(--brand)] transition-all duration-200 font-display font-medium"
          >
            <RiGithubLine size={18} />
            View all repos on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
