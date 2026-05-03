import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Hero from './sections/Hero'

// Lazy-load below-fold sections
const About = lazy(() => import('./sections/About'))
const Projects = lazy(() => import('./sections/Projects'))
const Skills = lazy(() => import('./sections/Skills'))
const Timeline = lazy(() => import('./sections/Timeline'))
const Contact = lazy(() => import('./sections/Contact'))

function SectionFallback() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--brand)] border-t-transparent animate-spin" />
    </div>
  )
}

function AppContent() {
  return (
    <div className="noise relative">
      <Helmet>
        <title>Sahil Gaund | AI/ML Engineer & Data Scientist</title>
        <meta name="description" content="Sahil Gaund — AI/ML Engineer building scalable ML systems and real-world AI solutions." />
        <meta name="keywords" content="AI, ML, machine learning, data science, Python, TensorFlow, PyTorch, portfolio" />
        <meta property="og:title" content="Sahil Gaund | AI/ML Engineer" />
        <meta property="og:description" content="Building scalable ML systems & real-world AI solutions." />
        <meta property="og:type" content="website" />
      </Helmet>

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Timeline />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
