import { create } from 'zustand'

export type AppStep = 'hero' | 'explore' | 'story' | 'quiz' | 'badge'
export type GameId = 'hub' | 'order' | 'guess' | 'compare' | 'speed' | 'moon'

function loadFromStorage<K extends string>(key: string, fallback: K[]): K[] {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function loadNumber(key: string, fallback: number): number {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    const n = parseInt(raw, 10)
    return Number.isFinite(n) ? n : fallback
  } catch {
    return fallback
  }
}

function loadScores(key: string): Record<string, number> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch { /* quota exceeded, ignore */ }
}

interface KidState {
  step: AppStep
  focusPlanet: string | null
  badges: string[]
  quizIndex: number
  quizScore: number
  currentGame: GameId | null
  totalStars: number
  highScores: Record<string, number>
  setStep: (s: AppStep) => void
  setFocusPlanet: (id: string | null) => void
  addBadge: (id: string) => void
  hasBadge: (id: string) => boolean
  setQuizIndex: (n: number) => void
  addQuizScore: () => void
  resetQuiz: () => void
  setCurrentGame: (g: GameId | null) => void
  addStars: (n: number) => void
  setHighScore: (g: string, s: number) => void
  getAllBadges: () => string[]
}

export const useKidStore = create<KidState>((set, get) => {
  const savedBadges = loadFromStorage<string>('mincute_badges', [])
  const savedStars = loadNumber('mincute_stars', 0)
  const savedScores = loadScores('mincute_highscores')

  return {
    step: 'hero',
    focusPlanet: null,
    badges: savedBadges,
    quizIndex: 0,
    quizScore: 0,
    currentGame: null,
    totalStars: savedStars,
    highScores: savedScores,

    setStep: (s) => set({ step: s }),
    setFocusPlanet: (id) => set({ focusPlanet: id }),

    addBadge: (id) =>
      set((st) => {
        const next = st.badges.includes(id) ? st.badges : [...st.badges, id]
        saveToStorage('mincute_badges', next)
        return { badges: next }
      }),
    hasBadge: (id) => get().badges.includes(id),

    setQuizIndex: (n) => set({ quizIndex: n }),
    addQuizScore: () => set((st) => ({ quizScore: st.quizScore + 1 })),
    resetQuiz: () => set({ quizIndex: 0, quizScore: 0 }),

    setCurrentGame: (g) => set({ currentGame: g }),

    addStars: (n) =>
      set((st) => {
        const next = st.totalStars + n
        saveToStorage('mincute_stars', next)
        return { totalStars: next }
      }),

    setHighScore: (g, s) =>
      set((st) => {
        const prev = st.highScores[g] ?? 0
        if (s <= prev) return {}
        const next = { ...st.highScores, [g]: s }
        saveToStorage('mincute_highscores', next)
        return { highScores: next }
      }),

    getAllBadges: () => get().badges,
  }
})