import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowUpLine } from 'react-icons/ri'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-2xl glass border border-[var(--brand)] text-[var(--brand)] shadow-lg shadow-[var(--glow)]"
          aria-label="Back to top"
        >
          <RiArrowUpLine size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
