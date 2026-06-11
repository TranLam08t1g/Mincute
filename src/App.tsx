import { AnimatePresence } from 'motion/react'
import { useKidStore, type GameId } from './store/kidStore'
import { KidHero } from './components/sections/KidHero'
import { SceneSetup } from './components/three/SceneSetup'
import { FloatingRobot } from './components/ui/FloatingRobot'
import { PlanetStoryCard } from './components/ui/PlanetStoryCard'
import { QuizPanel } from './components/ui/QuizPanel'
import { AchievementBadge } from './components/ui/AchievementBadge'
import { ComparisonBar } from './components/ui/ComparisonBar'
import { GameHub } from './components/games/GameHub'
import { PlanetOrder } from './components/games/PlanetOrder'
import { WhoAmI } from './components/games/WhoAmI'
import { PlanetCompare } from './components/games/PlanetCompare'
import { SpeedChallenge } from './components/games/SpeedChallenge'
import { MoonExplorer } from './components/games/MoonExplorer'
import { WebGLErrorBoundary } from './components/WebGLErrorBoundary'
import { motion } from 'motion/react'

function GameLauncher() {
  const setCurrentGame = useKidStore((s) => s.setCurrentGame)
  const totalStars = useKidStore((s) => s.totalStars)

  return (
    <motion.button
      onClick={() => setCurrentGame('hub')}
      className="fixed left-4 bottom-24 z-10 cursor-pointer
                 bg-[rgba(15,18,40,0.85)] backdrop-blur-md
                 rounded-full border border-[rgba(255,255,255,0.08)]
                 px-4 py-2.5 flex items-center gap-2
                 shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                 hover:bg-[rgba(25,30,55,0.9)] hover:border-[rgba(255,255,255,0.15)]
                 active:scale-[0.96] transition-all duration-200"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Mở trò chơi"
    >
      <span className="text-lg">🎮</span>
      <span className="text-xs font-bold text-[#d0d8ff]">Trò Chơi</span>
      {totalStars > 0 && (
        <span className="text-[10px] text-[#ffc864] font-bold">{totalStars}⭐</span>
      )}
    </motion.button>
  )
}

const gameComponents: Record<Exclude<GameId, 'hub'>, React.FC> = {
  order: PlanetOrder,
  guess: WhoAmI,
  compare: PlanetCompare,
  speed: SpeedChallenge,
  moon: MoonExplorer,
}

export function App() {
  const step = useKidStore((s) => s.step)
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const currentGame = useKidStore((s) => s.currentGame)

  const showExplore = step === 'explore' && !focusPlanet && currentGame === null

  const GameComponent = currentGame && currentGame !== 'hub'
    ? gameComponents[currentGame as keyof typeof gameComponents]
    : null

  return (
    <div className="relative w-full h-full">
      <WebGLErrorBoundary>
        <SceneSetup />
      </WebGLErrorBoundary>

      {currentGame === null && <FloatingRobot />}

      <AnimatePresence mode="wait">
        {step === 'hero' && currentGame === null && <KidHero key="hero" />}
      </AnimatePresence>

      {showExplore && <GameLauncher />}

      {currentGame === null && step !== 'hero' && <ComparisonBar />}

      <AnimatePresence>
        {currentGame === null && step === 'story' && focusPlanet && <PlanetStoryCard key="story" />}
        {currentGame === null && step === 'quiz' && focusPlanet && <QuizPanel key="quiz" />}
        {currentGame === null && step === 'badge' && focusPlanet && <AchievementBadge key="badge" />}
      </AnimatePresence>

      {currentGame === 'hub' && <GameHub />}
      {currentGame && currentGame !== 'hub' && GameComponent && <GameComponent />}
    </div>
  )
}