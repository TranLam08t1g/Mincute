import { AnimatePresence } from 'motion/react'
import { useKidStore } from './store/kidStore'
import { KidHero } from './components/sections/KidHero'
import { SceneSetup } from './components/three/SceneSetup'
import { FloatingRobot } from './components/ui/FloatingRobot'
import { PlanetStoryCard } from './components/ui/PlanetStoryCard'
import { QuizPanel } from './components/ui/QuizPanel'
import { AchievementBadge } from './components/ui/AchievementBadge'
import { ComparisonBar } from './components/ui/ComparisonBar'
import { WebGLErrorBoundary } from './components/WebGLErrorBoundary'

export function App() {
  const step = useKidStore((s) => s.step)
  const focusPlanet = useKidStore((s) => s.focusPlanet)

  return (
    <div className="relative w-full h-full">
      <WebGLErrorBoundary>
        <SceneSetup />
      </WebGLErrorBoundary>

      <FloatingRobot />

      <AnimatePresence mode="wait">
        {step === 'hero' && <KidHero key="hero" />}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'story' && focusPlanet && <PlanetStoryCard key="story" />}
        {step === 'quiz' && focusPlanet && <QuizPanel key="quiz" />}
        {step === 'badge' && focusPlanet && <AchievementBadge key="badge" />}
      </AnimatePresence>

      {step !== 'hero' && <ComparisonBar />}
    </div>
  )
}