import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'
import { RobotGuideAvatar } from '../ui/RobotGuideAvatar'
import { GameResult } from './GameResult'

const TOTAL_ROUNDS = 10

type CompareType = 'size' | 'distance' | 'temperature' | 'moons'

const compareTypes: { id: CompareType; label: string; field: string }[] = [
  { id: 'size', label: 'Hành tinh nào LỚN HƠN?', field: 'radius' },
  { id: 'distance', label: 'Hành tinh nào GẦN MẶT TRỜI HƠN?', field: 'orbit' },
  { id: 'temperature', label: 'Hành tinh nào NÓNG HƠN?', field: 'temperature' },
  { id: 'moons', label: 'Hành tinh nào NHIỀU MẶT TRĂNG HƠN?', field: 'numberOfMoons' },
]

function getTempValue(t: string): number {
  const nums = t.match(/-?\d+/g)
  if (!nums || nums.length === 0) return 0
  return nums.map(Number).reduce((a, b) => a + b, 0) / nums.length
}

function getCompareValue(planet: typeof KID_PLANETS[0], type: CompareType): number {
  switch (type) {
    case 'size': return planet.radius
    case 'distance': return planet.orbit
    case 'temperature': return getTempValue(planet.temperature)
    case 'moons': return planet.numberOfMoons
  }
}

function generateRound(): { a: typeof KID_PLANETS[0]; b: typeof KID_PLANETS[0]; type: CompareType } {
  const shuffled = [...KID_PLANETS].sort(() => Math.random() - 0.5)
  const a = shuffled[0]
  const b = shuffled[1]
  const type = compareTypes[Math.floor(Math.random() * compareTypes.length)].id
  return { a, b, type }
}

export function PlanetCompare() {
  const setCurrentGame = useKidStore((s) => s.setCurrentGame)
  const addStars = useKidStore((s) => s.addStars)
  const setHighScore = useKidStore((s) => s.setHighScore)

  const [rounds, setRounds] = useState(() => Array.from({ length: TOTAL_ROUNDS }, () => generateRound()))
  const [roundIndex, setRoundIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showCorrect, setShowCorrect] = useState(false)

  const round = rounds[roundIndex]
  const typeLabel = compareTypes.find((t) => t.id === round.type)!.label

  const getShowValue = (planet: typeof KID_PLANETS[0]) => {
    switch (round.type) {
      case 'size': return planet.sizeComparison
      case 'distance': return planet.distanceFromSun
      case 'temperature': return planet.temperature
      case 'moons': return `${planet.numberOfMoons} mặt trăng`
    }
  }

  const IconA = getPlanetIcon(round.a.id)
  const IconB = getPlanetIcon(round.b.id)

  const valA = getCompareValue(round.a, round.type)
  const valB = getCompareValue(round.b, round.type)
  const correctAnswer = round.type === 'distance' ? (valA < valB ? 'a' : 'b') : (valA > valB ? 'a' : 'b')

  const handleSelect = useCallback((choice: 'a' | 'b') => {
    if (selected) return
    setSelected(choice)
    setShowCorrect(true)
    if (choice === correctAnswer) {
      setScore((s) => s + 1)
    }

    setTimeout(() => {
      setShowCorrect(false)
      setSelected(null)
      if (roundIndex >= TOTAL_ROUNDS - 1) {
        setFinished(true)
        setShowResult(true)
      } else {
        setRoundIndex((i) => i + 1)
      }
    }, 1500)
  }, [selected, roundIndex, correctAnswer])

  useEffect(() => {
    if (finished && showResult) {
      setHighScore('compare', score)
      const stars = score >= 9 ? 3 : score >= 7 ? 2 : 1
      addStars(stars)
    }
  }, [finished, showResult])

  const starCount = score >= 9 ? 3 : score >= 7 ? 2 : 1

  const handleReplay = () => {
    setRounds(Array.from({ length: TOTAL_ROUNDS }, () => generateRound()))
    setRoundIndex(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
    setShowResult(false)
    setShowCorrect(false)
  }

  if (finished && showResult) {
    return (
      <GameResult
        gameId="compare"
        gameName="So Găng Vũ Trụ"
        score={score}
        maxScore={TOTAL_ROUNDS}
        stars={starCount}
        onReplay={handleReplay}
      />
    )
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto p-4"
      style={{ background: 'radial-gradient(ellipse at center, rgba(20,28,60,0.95) 0%, rgba(8,13,31,0.98) 100%)' }}
    >
      <button
        onClick={() => setCurrentGame(null)}
        className="absolute top-6 right-6 z-10 cursor-pointer w-10 h-10 rounded-full
                   bg-[rgba(255,255,255,0.06)] flex items-center justify-center
                   text-[#7a8aaa] hover:text-white active:scale-90 transition-all"
        aria-label="Thoát"
      >
        ✕
      </button>

      <div className="flex items-center gap-2 mb-6">
        <RobotGuideAvatar mood="think" width={36} height={36} />
        <span className="text-sm text-[#b0b8d0]">Câu {roundIndex + 1}/{TOTAL_ROUNDS} ⭐ {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={roundIndex}
          className="max-w-md w-full"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold text-center text-white mb-6">{typeLabel}</h2>

          <div className="flex gap-4 mb-6">
            {(['a', 'b'] as const).map((choice) => {
              const planet = choice === 'a' ? round.a : round.b
              const Icon = choice === 'a' ? IconA : IconB
              const isSelected = selected === choice
              const isCorrectPlanet = choice === correctAnswer
              const showGlow = showCorrect && isCorrectPlanet
              const showDim = showCorrect && !isCorrectPlanet && isSelected

              return (
                <motion.button
                  key={choice}
                  onClick={() => handleSelect(choice)}
                  disabled={selected !== null}
                  className={`flex-1 cursor-pointer rounded-2xl p-5 border flex flex-col items-center gap-3
                             transition-all disabled:cursor-default
                             ${showGlow ? 'border-[rgba(120,255,170,0.5)] bg-[rgba(120,255,170,0.06)]' :
                               showDim ? 'border-[rgba(255,110,110,0.4)] bg-[rgba(255,110,110,0.04)] opacity-60' :
                               isSelected && !showCorrect ? 'border-[rgba(150,180,255,0.3)]' :
                               'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.15)]'}`}
                  whileHover={selected === null ? { scale: 1.03, borderColor: 'rgba(150,180,255,0.3)' } : {}}
                  whileTap={selected === null ? { scale: 0.96 } : {}}
                >
                  {Icon && <Icon width={48} height={48} />}
                  <span className="text-sm font-bold text-white">{planet.name}</span>
                  {showCorrect && (
                    <motion.span
                      className="text-sm text-[#5a6a8a]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {getShowValue(planet)}
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </div>

          {showCorrect && (
            <motion.p
              className="text-center text-sm font-bold"
              style={{ color: selected === correctAnswer ? '#7cffa4' : '#ffaa88' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {selected === correctAnswer ? 'Chính xác!' : `Sai rồi! ${round[correctAnswer === 'a' ? 'a' : 'b'].name} mới đúng!`}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}