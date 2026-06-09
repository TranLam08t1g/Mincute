import { create } from 'zustand'

export type AppStep = 'hero' | 'explore' | 'story' | 'quiz' | 'badge'

interface KidState {
  step: AppStep
  focusPlanet: string | null
  badges: string[]
  quizIndex: number
  quizScore: number
  setStep: (s: AppStep) => void
  setFocusPlanet: (id: string | null) => void
  addBadge: (id: string) => void
  hasBadge: (id: string) => boolean
  setQuizIndex: (n: number) => void
  addQuizScore: () => void
  resetQuiz: () => void
}

export const useKidStore = create<KidState>((set, get) => ({
  step: 'hero',
  focusPlanet: null,
  badges: [],
  quizIndex: 0,
  quizScore: 0,
  setStep: (s) => set({ step: s }),
  setFocusPlanet: (id) => set({ focusPlanet: id }),
  addBadge: (id) =>
    set((st) => ({
      badges: st.badges.includes(id) ? st.badges : [...st.badges, id],
    })),
  hasBadge: (id) => get().badges.includes(id),
  setQuizIndex: (n) => set({ quizIndex: n }),
  addQuizScore: () => set((st) => ({ quizScore: st.quizScore + 1 })),
  resetQuiz: () => set({ quizIndex: 0, quizScore: 0 }),
}))