import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'
import { RobotGuideAvatar } from '../ui/RobotGuideAvatar'
import { GameResult } from './GameResult'

const QUESTION_TIME = 12
const TOTAL_QUESTIONS = 10

interface QuizQ {
  question: string
  options: string[]
  correct: number
  planetId: string
}

function getRandomQuestions(count: number): QuizQ[] {
  const all: QuizQ[] = []
  for (const p of KID_PLANETS) {
    for (const q of p.quiz) {
      all.push({ ...q, planetId: p.id })
    }
  }
  const shuffled = all.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function SpeedChallenge() {
  const setCurrentGame = useKidStore((s) => s.setCurrentGame)
  const addStars = useKidStore((s) => s.addStars)
  const setHighScore = useKidStore((s) => s.setHighScore)

  const questions = useMemo(() => getRandomQuestions(TOTAL_QUESTIONS), [])
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [showResult, setShowResult] = useState(false)
  const [combo, setCombo] = useState(0)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval>>(0)

  const currentQ = questions[qIndex]
  const PlanetIcon = getPlanetIcon(currentQ.planetId)

  useEffect(() => {
    if (!finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            handleTimeUp()
            return 0
          }
          return t - 1
        })
      }, 1000)
      return () => clearInterval(timerRef.current)
    }
  }, [qIndex, finished])

  const handleTimeUp = useCallback(() => {
    if (selected !== null) return
    setSelected(-1)
    setCombo(0)
    setTimeout(() => goNext(), 1200)
  }, [selected, qIndex])

  const handleAnswer = useCallback((i: number) => {
    if (selected !== null) return
    setSelected(i)
    const multiplier = combo >= 5 ? 2 : combo >= 3 ? 1.5 : 1
    const timeBonus = timeLeft / QUESTION_TIME
    if (i === currentQ.correct) {
      const points = Math.round(10 * timeBonus * multiplier)
      setScore((s) => s + points)
      setCombo((c) => {
        const next = c + 1
        return next
      })
    } else {
      setCombo(0)
    }
    setTimeout(() => goNext(), 1000)
  }, [selected, currentQ, combo, timeLeft])

  const goNext = useCallback(() => {
    if (qIndex >= TOTAL_QUESTIONS - 1) {
      setFinished(true)
      setShowResult(true)
      clearInterval(timerRef.current)
    } else {
      setQIndex((i) => i + 1)
      setSelected(null)
      setTimeLeft(QUESTION_TIME)
    }
  }, [qIndex])

  useEffect(() => {
    if (finished && showResult) {
      setHighScore('speed', score)
      const stars = score >= 250 ? 3 : score >= 150 ? 2 : 1
      addStars(stars)
    }
  }, [finished, showResult])

  const starCount = score >= 250 ? 3 : score >= 150 ? 2 : 1

  const handleReplay = () => window.location.reload()

  if (finished && showResult) {
    return (
      <GameResult
        gameId="speed"
        gameName="Đua Tốc Độ Vũ Trụ"
        score={score}
        maxScore={300}
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

      <div className="max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <RobotGuideAvatar mood="think" width={36} height={36} />
            <span className="text-sm text-[#b0b8d0]">Câu {qIndex + 1}/{TOTAL_QUESTIONS}</span>
          </div>
          <div className="flex items-center gap-4">
            {combo >= 3 && (
              <motion.span
                className="text-sm font-bold text-[#ffd84d]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={combo}
              >
                ×{combo >= 5 ? 2 : 1.5}
              </motion.span>
            )}
            <span className="text-sm font-bold text-[#ffc864]">⭐ {score}</span>
          </div>
        </div>

        <div className="h-2 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: timeLeft > 5 ? '#7ed6ff' : timeLeft > 3 ? '#ffd84d' : '#ff4d7a',
              width: `${(timeLeft / QUESTION_TIME) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {PlanetIcon && (
          <div className="flex items-center gap-2 mb-4">
            <PlanetIcon width={24} height={24} />
            <span className="text-xs text-[#5a6a8a]">
              {KID_PLANETS.find((p) => p.id === currentQ.planetId)?.name}
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-4 border border-[rgba(255,255,255,0.05)] mb-4">
              <p className="text-base font-semibold text-[#f0f4ff] leading-snug text-center">
                {currentQ.question}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt, i) => {
                const isSelected = selected === i
                const isCorrect = i === currentQ.correct

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className="cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold
                               text-left disabled:cursor-default transition-all duration-200"
                    style={{
                      borderColor: selected !== null
                        ? isCorrect ? 'rgba(120,255,170,0.5)' : isSelected ? 'rgba(255,110,110,0.5)' : 'rgba(255,255,255,0.04)'
                        : 'rgba(255,255,255,0.08)',
                      backgroundColor: selected !== null
                        ? isCorrect ? 'rgba(120,255,170,0.08)' : isSelected ? 'rgba(255,110,110,0.06)' : 'rgba(255,255,255,0.01)'
                        : 'rgba(255,255,255,0.02)',
                      color: selected !== null
                        ? isCorrect ? '#8cffaa' : isSelected ? '#ff8888' : '#4a5a7a'
                        : '#b0b8d0',
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    whileHover={selected === null ? { scale: 1.02, borderColor: 'rgba(150,180,255,0.4)' } : {}}
                    whileTap={selected === null ? { scale: 0.97 } : {}}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg
                                   bg-[rgba(255,255,255,0.06)] mr-2 text-xs font-bold text-[#8899bb]">
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    {opt}
                    {selected !== null && isCorrect && <span className="ml-auto">✓</span>}
                    {isSelected && !isCorrect && <span className="ml-auto">✗</span>}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}