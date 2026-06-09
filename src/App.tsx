import { useKidStore } from './store/kidStore'
import { KidHero } from './components/sections/KidHero'
import { SceneSetup } from './components/three/SceneSetup'
import { GuideCharacter } from './components/ui/GuideCharacter'
import { PlanetStoryCard } from './components/ui/PlanetStoryCard'
import { QuizPanel } from './components/ui/QuizPanel'
import { AchievementBadge } from './components/ui/AchievementBadge'
import { ComparisonBar } from './components/ui/ComparisonBar'

export function App() {
  const step = useKidStore((s) => s.step)
  const focusPlanet = useKidStore((s) => s.focusPlanet)

  return (
    <div className="relative w-full h-full">
      <SceneSetup />

      {step === 'hero' && <KidHero />}

      {(step === 'explore' || step === 'quiz') && <GuideCharacter />}

      {step === 'story' && focusPlanet && <PlanetStoryCard />}

      {step === 'quiz' && focusPlanet && <QuizPanel />}

      {step === 'badge' && focusPlanet && <AchievementBadge />}

      {step !== 'hero' && <ComparisonBar />}
    </div>
  )
}