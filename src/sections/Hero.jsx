import { motion } from 'framer-motion'
import { RiGithubLine, RiLinkedinBoxLine, RiArrowDownLine } from 'react-icons/ri'
import { useTyping } from '../hooks/useTyping'
import { personalInfo, typingPhrases } from '../utils/data'

function Orb({ className, style }) {
  return <div className={`orb ${className}`} style={style} />
}

export default function Hero() {
  const typed = useTyping(typingPhrases)

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Orbs */}
      <Orb
        className="w-96 h-96 -top-20 -left-20 opacity-30"
        style={{ background: 'radial-gradient(circle, var(--brand), transparent 70%)' }}
      />
      <Orb
        className="w-80 h-80 bottom-20 right-10 opacity-20"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)', animationDelay: '3s' }}
      />
      <Orb
        className="w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{ background: 'radial-gradient(circle, var(--brand), transparent 70%)', animationDelay: '6s' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--brand)] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand)]" />
          </span>
          <span className="font-mono text-xs text-[var(--brand)] tracking-wider">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4"
          style={{ color: 'var(--text)' }}
        >
          {personalInfo.name.split(' ')[0]}{' '}
          <span className="text-gradient">{personalInfo.name.split(' ')[1]}</span>
        </motion.h1>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-2xl sm:text-3xl font-display font-semibold mb-6 h-10 flex items-center justify-center gap-0"
          style={{ color: 'var(--text-2)' }}
        >
          <span>{typed}</span>
          <span className="typing-cursor" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg text-[var(--text-2)] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-2xl font-display font-semibold text-white text-sm tracking-wide"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--accent))', boxShadow: '0 0 30px var(--glow)' }}
          >
            View My Work
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-2xl font-display font-semibold text-sm tracking-wide glass border border-[var(--border)] flex items-center gap-2"
            style={{ color: 'var(--text)' }}
          >
            <RiGithubLine size={18} />
            GitHub
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-2xl font-display font-semibold text-sm tracking-wide glass border border-[var(--border)] flex items-center gap-2"
            style={{ color: 'var(--text)' }}
          >
            <RiLinkedinBoxLine size={18} />
            LinkedIn
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: '7+', label: 'Certifications' },
            { value: '10+', label: 'ML Projects' },
            { value: '2+', label: 'Simulations' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-[var(--text-3)] tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-3)] hover:text-[var(--brand)] transition-colors"
      >
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <RiArrowDownLine size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
