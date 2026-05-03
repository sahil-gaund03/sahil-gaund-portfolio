import { useState, useEffect } from 'react'

export function useTyping(phrases, { typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800 } = {}) {
  const [display, setDisplay] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]

    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), typeSpeed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), deleteSpeed)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % phrases.length)
    }

    setDisplay(current.slice(0, charIdx))

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs])

  return display
}
