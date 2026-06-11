import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'
import { RobotGuideAvatar } from './RobotGuideAvatar'
import { QuizPlanet3D } from './QuizPlanet3D'

const planetAccents: Record<string, string> = {
  mercury: '#aabbcc',
  venus: '#e8c876',
  earth: '#4d9de0',
  mars: '#dd5544',
  jupiter: '#ddaa66',
  saturn: '#ddaa44',
  uranus: '#66cccc',
  neptune: '#4466dd',
}

const optionLabels = ['A', 'B', 'C', 'D']

function Sparkle({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path d="M6 0 L7 4 L11 5 L7 6 L6 10 L5 6 L1 5 L5 4 Z" fill={color} />
      </svg>
    </motion.div>
  )
}

function Sparkles({ active, color }: { active: boolean; color: string }) {
  const [sparkles] = useState(() =>
    Array.from({ length: 12 }, () => ({
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      delay: Math.random() * 0.3,
    }))
  )
  if (!active) return null
  return (
    <>
      {sparkles.map((s, i) => (
        <Sparkle key={i} x={s.x as unknown as number} y={s.y as unknown as number} color={color} />
      ))}
    </>
  )
}

export function QuizPanel() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const setStep = useKidStore((s) => s.setStep)
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const addBadge = useKidStore((s) => s.addBadge)
  const storedQIndex = useKidStore((s) => s.quizIndex)
  const storedScore = useKidStore((s) => s.quizScore)
  const setQuizIndex = useKidStore((s) => s.setQuizIndex)
  const addQuizScore = useKidStore((s) => s.addQuizScore)
  const resetQuiz = useKidStore((s) => s.resetQuiz)

  const [qIndex, setQIndex] = useState(storedQIndex)
  const [score, setScore] = useState(storedScore)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const [robotMood, setRobotMood] = useState<'think' | 'happy' | 'celebrate'>('think')
  const [sparkleActive, setSparkleActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const planet = KID_PLANETS.find((p) => p.id === focusPlanet)
  const PlanetIcon = planet ? getPlanetIcon(planet.id) : null
  const accent = planet ? planetAccents[planet.id] ?? '#4d9de0' : '#4d9de0'

  useEffect(() => {
    if (!planet || planet.quiz.length === 0) {
      if (focusPlanet) addBadge(focusPlanet)
      setStep('badge')
    }
  }, [])

  useEffect(() => {
    setQIndex(storedQIndex)
    setScore(storedScore)
  }, [storedQIndex, storedScore])

  if (!planet || planet.quiz.length === 0) return null

  const quiz = planet.quiz[qIndex]
  const isCorrect = selected === quiz?.correct
  const isLast = qIndex >= planet.quiz.length - 1
  const progress = ((qIndex + (showResult ? 1 : 0)) / planet.quiz.length) * 100

  const handleAnswer = useCallback((i: number) => {
    if (selected !== null) return
    setSelected(i)
    setShowResult(true)
    if (i === quiz.correct) {
      addQuizScore()
      setScore((s) => s + 1)
      setRobotMood('celebrate')
      setSparkleActive(true)
      setTimeout(() => setSparkleActive(false), 1500)
    } else {
      setRobotMood('think')
    }
  }, [selected, quiz, addQuizScore])

  const handleNext = useCallback(() => {
    if (isLast) {
      resetQuiz()
      if (focusPlanet) addBadge(focusPlanet)
      setStep('badge')
    } else {
      setSelected(null)
      setShowResult(false)
      setRobotMood('think')
      setQIndex((i) => {
        const next = i + 1
        setQuizIndex(next)
        return next
      })
      setAnimKey((k) => k + 1)
    }
  }, [isLast, focusPlanet, addBadge, resetQuiz, setStep, setQuizIndex])

  const handleClose = useCallback(() => {
    setQuizIndex(qIndex)
    setFocusPlanet(null)
    setStep('explore')
  }, [qIndex, setQuizIndex, setFocusPlanet, setStep])

  const isFourOptions = quiz.options.length === 4

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto p-4 bg-[rgba(0,0,0,0.35)]"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      role="dialog"
      aria-label={`Câu đố về ${planet.name}`}
    >
      <motion.div
        ref={containerRef}
        key={animKey}
        className="relative bg-[rgba(14,18,42,0.96)] backdrop-blur-2xl
                   rounded-3xl border border-[rgba(255,255,255,0.08)]
                   shadow-[0_0_80px_rgba(80,120,255,0.1)]
                   max-w-md w-full overflow-hidden"
        style={{
          boxShadow: `0 0 80px ${accent}20, 0 0 20px ${accent}10`,
          borderColor: `${accent}20`,
        }}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      >
        <Sparkles active={sparkleActive} color={accent} />

        <div className="pt-5 pb-3 flex flex-col items-center">
          <QuizPlanet3D planetId={planet.id} />

          <motion.div
            className="flex items-center gap-2 mb-1 -mt-1"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            {PlanetIcon ? <PlanetIcon width={28} height={28} aria-hidden="true" /> : <span className="text-2xl">{planet.emoji}</span>}
            <span className="text-xl font-bold text-white">{planet.name}</span>
            <RobotGuideAvatar mood={robotMood} width={32} height={32} />
          </motion.div>
          <motion.p
            className="text-xs text-[#6a7a9a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Gia Khiêm đố bạn nè!
          </motion.p>
        </div>

        <div className="px-5 mb-5">
          <div className="relative h-2.5 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden border border-[rgba(255,255,255,0.04)]">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accent}, ${accent}dd)` }}
              initial={{ width: `${((qIndex) / planet.quiz.length) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-[10px] font-bold text-white drop-shadow-[0_0_3px_rgba(0,0,0,0.5)]"
                key={qIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {qIndex + 1}/{planet.quiz.length}
              </motion.span>
            </div>
          </div>
        </div>

        <div className="px-5 mb-5">
          <motion.div
            className="rounded-2xl p-4 border"
            style={{
              backgroundColor: `${accent}08`,
              borderColor: `${accent}1a`,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <p className="text-lg font-bold text-[#f0f4ff] leading-snug text-center">
              {quiz.question}
            </p>
          </motion.div>
        </div>

        <div
          className={
            isFourOptions
              ? 'px-5 grid grid-cols-2 gap-3 mb-5'
              : 'px-5 flex flex-col gap-3 mb-5'
          }
        >
          {quiz.options.map((opt, i) => {
            const isSelected = selected === i
            const isAnswer = selected !== null && i === quiz.correct
            const isWrong = selected !== null && isSelected && !isCorrect

            return (
              <motion.button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className="relative cursor-pointer rounded-2xl border px-4 py-3.5
                           text-sm font-semibold text-left
                           disabled:cursor-default overflow-hidden
                           group"
                style={{
                  borderColor: isAnswer
                    ? `${accent}80`
                    : isWrong
                      ? 'rgba(255,110,110,0.5)'
                      : selected !== null
                        ? 'rgba(255,255,255,0.03)'
                        : `${accent}1a`,
                  backgroundColor: isAnswer
                    ? `${accent}15`
                    : isWrong
                      ? 'rgba(255,110,110,0.08)'
                      : selected !== null
                        ? 'rgba(255,255,255,0.01)'
                        : 'rgba(255,255,255,0.02)',
                  color: isAnswer
                    ? '#f0f4ff'
                    : isWrong
                      ? '#ff8888'
                      : selected !== null
                        ? '#4a5a7a'
                        : '#b0b8d0',
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={selected === null ? { scale: 1.02, borderColor: `${accent}60` } : {}}
                whileTap={selected === null ? { scale: 0.97 } : {}}
                aria-label={`Đáp án ${optionLabels[i]}: ${opt}`}
              >
                {selected === null && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }}
                  />
                )}

                <span className="relative flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: isAnswer
                        ? `${accent}30`
                        : isWrong
                          ? 'rgba(255,110,110,0.2)'
                          : 'rgba(255,255,255,0.06)',
                      color: isAnswer ? '#f0f4ff' : isWrong ? '#ff8888' : '#8899bb',
                    }}
                  >
                    {optionLabels[i]}
                  </span>
                  <span className="relative">{opt}</span>

                  {isAnswer && <span className="ml-auto text-base">✓</span>}
                  {isWrong && <span className="ml-auto text-base">✗</span>}
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="px-5 pb-3 flex items-center justify-between text-xs text-[#5a6a8a]">
          <span className="flex items-center gap-1.5">
            <span className="text-sm">⭐</span>
            <span className="font-bold text-[#ffc864]">{score}</span>
          </span>

          {!showResult && (
            <span className="text-[10px] italic opacity-60">
              Chọn đáp án đúng nha Min!
            </span>
          )}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              className="px-5 pb-5"
              initial={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="text-center rounded-2xl py-3.5 px-4 mb-4 border"
                style={{
                  backgroundColor: isCorrect ? `${accent}0a` : 'rgba(255,150,100,0.04)',
                  borderColor: isCorrect ? `${accent}25` : 'rgba(255,150,100,0.1)',
                }}
              >
                <motion.p
                  className="text-3xl mb-1.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10, delay: 0.1 }}
                >
                  {isCorrect ? '🎉' : '🤔'}
                </motion.p>
                <p
                  className="font-bold text-base mb-1"
                  style={{ color: isCorrect ? accent : '#ffaa88' }}
                >
                  {isCorrect ? 'Xuất sắc Min ơi!' : 'Gần đúng rồi!'}
                </p>
                <p className="text-xs text-[#6a7a9a]">
                  {isCorrect
                    ? 'Gia Khiêm tự hào về bạn! *bíp bíp*'
                    : 'Đừng lo Min, học hỏi là quan trọng nhất!'}
                </p>
              </div>

              <motion.button
                onClick={handleNext}
                className="w-full cursor-pointer rounded-full py-3.5 text-sm font-bold
                           text-white active:scale-[0.96] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  boxShadow: `0 0 30px ${accent}40`,
                }}
                whileHover={{ scale: 1.03, boxShadow: `0 0 40px ${accent}60` }}
                whileTap={{ scale: 0.95 }}
                aria-label={isLast ? 'Nhận huy hiệu' : 'Câu tiếp theo'}
              >
                {isLast ? 'Nhận Huy Hiệu 🏆' : 'Câu Tiếp Theo →'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}