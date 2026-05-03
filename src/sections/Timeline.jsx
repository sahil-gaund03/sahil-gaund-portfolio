import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import { experience } from '../utils/data'

const TYPE_STYLES = {
  experience: { dot: 'var(--brand)', label: 'Experience', bg: 'rgba(14,165,233,0.1)', text: '#38bdf8' },
  project: { dot: 'var(--accent)', label: 'Project', bg: 'rgba(139,92,246,0.1)', text: '#a78bfa' },
  achievement: { dot: '#fbbf24', label: 'Achievement', bg: 'rgba(251,191,36,0.1)', text: '#fbbf24' },
}

function TimelineItem({ item, index }) {
  const isEven = index % 2 === 0
  const style = TYPE_STYLES[item.type] || TYPE_STYLES.experience

  return (
    <div className={`relative flex items-start gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex-1 md:max-w-[calc(50%-3rem)]"
      >
        <div className="glass rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300 group">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 inline-block"
                style={{ background: style.bg, color: style.text }}
              >
                {style.label}
              </span>
              <h3 className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>{item.title}</h3>
              <p className="text-sm text-[var(--brand)] font-medium">{item.company}</p>
            </div>
            <span className="font-mono text-xs text-[var(--text-3)] shrink-0 mt-1">{item.year}</span>
          </div>
          <p className="text-sm text-[var(--text-2)] leading-relaxed mb-4">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 glass rounded-full text-xs font-mono text-[var(--text-3)] border border-[var(--border)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center dot (hidden on mobile, shown on md+) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className="w-4 h-4 rounded-full border-2 border-[var(--bg)]"
          style={{ background: style.dot, boxShadow: `0 0 12px ${style.dot}80` }}
        />
      </div>

      {/* Empty half for layout */}
      <div className="hidden md:block flex-1 md:max-w-[calc(50%-3rem)]" />
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative">
      <div className="section-padding">
        <SectionTitle
          label="My Journey"
          title="Experience & Milestones"
          subtitle="The projects, simulations, and achievements that shaped my ML career"
        />

        <div className="relative timeline-connector">
          <div className="flex flex-col gap-12">
            {experience.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
