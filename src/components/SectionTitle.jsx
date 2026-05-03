import { motion } from 'framer-motion'

export default function SectionTitle({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      <span className="font-mono text-xs tracking-widest uppercase text-[var(--brand)] mb-3 block">
        {label}
      </span>
      <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-2)] text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}
