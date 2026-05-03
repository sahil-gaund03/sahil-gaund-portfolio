import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMoonLine, RiSunLine, RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { useTheme } from '../context/ThemeContext'
import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'timeline', 'contact']

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="font-display font-bold text-lg tracking-tight"
          >
            <span className="text-gradient">SG</span>
            <span style={{ color: 'var(--text-2)' }} className="ml-1 font-light">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const sectionId = item.href.replace('#', '')
              const isActive = active === sectionId
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--brand)]'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'var(--glow)', border: '1px solid var(--brand)', opacity: 0.4 }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="p-2.5 rounded-xl glass text-[var(--text-2)] hover:text-[var(--brand)] transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <button
              className="md:hidden p-2.5 rounded-xl glass text-[var(--text-2)]"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-[var(--border)] py-4 px-4 flex flex-col gap-1 md:hidden"
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="text-left px-4 py-3 rounded-xl text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-all duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
