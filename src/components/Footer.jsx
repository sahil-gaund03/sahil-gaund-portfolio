import { motion } from 'framer-motion'
import { RiGithubLine, RiLinkedinBoxLine, RiMailLine, RiHeartFill } from 'react-icons/ri'
import { personalInfo } from '../utils/data'

const LINKS = [
  { icon: <RiGithubLine size={18} />, href: personalInfo.github, label: 'GitHub' },
  { icon: <RiLinkedinBoxLine size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: <RiMailLine size={18} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="font-display font-bold text-lg text-gradient mb-1">Sahil Gaund</div>
          <div className="text-xs text-[var(--text-3)] font-mono">AI/ML Engineer · Data Scientist</div>
        </div>

        <div className="flex items-center gap-3">
          {LINKS.map(link => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 glass rounded-xl border border-[var(--border)] hover:border-[var(--brand)] text-[var(--text-2)] hover:text-[var(--brand)] transition-all duration-200"
              aria-label={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[var(--text-3)]">
          <span>Built with</span>
          <RiHeartFill size={12} className="text-red-400" />
          <span>using React + Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
