import { useState, useEffect } from 'react'
import { ML_KEYWORDS, DATA_KEYWORDS, FEATURED_REPO } from '../utils/data'

function classifyProject(repo) {
  const text = `${repo.name} ${repo.description || ''} ${repo.language || ''} ${(repo.topics || []).join(' ')}`.toLowerCase()
  if (ML_KEYWORDS.some(kw => text.includes(kw))) return 'ML'
  if (DATA_KEYWORDS.some(kw => text.includes(kw))) return 'Data'
  return 'Web'
}

function scoreRepo(repo) {
  const category = classifyProject(repo)
  const categoryScore = category === 'ML' ? 100 : category === 'Data' ? 60 : 20
  const starScore = (repo.stargazers_count || 0) * 10
  const recentScore = new Date(repo.updated_at).getTime() / 1e10
  return categoryScore + starScore + recentScore
}

export function useGitHubRepos(username) {
  const [repos, setRepos] = useState([])
  const [featured, setFeatured] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchRepos() {
      try {
        setLoading(true)
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        const data = await res.json()

        if (cancelled) return

        // Filter forks
        const ownRepos = data.filter(r => !r.fork)

        // Find featured
        const featuredRepo = ownRepos.find(r =>
          r.name.toLowerCase().includes('churn') ||
          r.name.toLowerCase().includes('bank')
        )

        // Score and sort
        const sorted = ownRepos
          .filter(r => r !== featuredRepo)
          .sort((a, b) => scoreRepo(b) - scoreRepo(a))
          .slice(0, 6)
          .map(r => ({ ...r, category: classifyProject(r) }))

        if (featuredRepo) {
          setFeatured({ ...featuredRepo, category: 'ML' })
        }
        setRepos(sorted)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchRepos()
    return () => { cancelled = true }
  }, [username])

  return { repos, featured, loading, error }
}
