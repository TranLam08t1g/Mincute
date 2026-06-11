import { AnimatePresence } from 'motion/react'
import { useKidStore } from './store/kidStore'
import { KidHero } from './components/sections/KidHero'
import { SceneSetup } from './components/three/SceneSetup'
import { GuideCharacter } from './components/ui/GuideCharacter'
import { PlanetStoryCard } from './components/ui/PlanetStoryCard'
import { QuizPanel } from './components/ui/QuizPanel'
import { AchievementBadge } from './components/ui/AchievementBadge'
import { ComparisonBar } from './components/ui/ComparisonBar'
import { TouchHint } from './components/ui/TouchHint'
import { WebGLErrorBoundary } from './components/WebGLErrorBoundary'

export function App() {
  const step = useKidStore((s) => s.step)
  const focusPlanet = useKidStore((s) => s.focusPlanet)

  return (
    <div className="relative w-full h-full">
      <WebGLErrorBoundary>
        <SceneSetup />
      </WebGLErrorBoundary>

      <AnimatePresence mode="wait">
        {step === 'hero' && (
          <KidHero key="hero" />
        )}
      </AnimatePresence>

      {(step === 'explore' || step === 'quiz') && <GuideCharacter />}

      {step === 'explore' && !focusPlanet && <TouchHint />}

      <AnimatePresence>
        {step === 'story' && focusPlanet && (
          <PlanetStoryCard key="story" />
        )}
        {step === 'quiz' && focusPlanet && (
          <QuizPanel key="quiz" />
        )}
        {step === 'badge' && focusPlanet && (
          <AchievementBadge key="badge" />
        )}
      </AnimatePresence>

      {step !== 'hero' && <ComparisonBar />}
    </div>
  )
}