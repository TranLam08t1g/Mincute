import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'
import { QuizPlanet3D } from './QuizPlanet3D'

const optionLabels = ['A', 'B', 'C', 'D']

const staggerOption = {
  initial: { opacity: 0, x: -12 },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.06, duration: 0.35, ease: 'easeOut' as const },
  }),
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

  const planet = KID_PLANETS.find((p) => p.id === focusPlanet)
  const PlanetIcon = planet ? getPlanetIcon(planet.id) : null

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

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    setShowResult(true)
    if (i === quiz.correct) {
      addQuizScore()
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (isLast) {
      resetQuiz()
      if (focusPlanet) addBadge(focusPlanet)
      setStep('badge')
    } else {
      setSelected(null)
      setShowResult(false)
      setQIndex((i) => {
        const next = i + 1
        setQuizIndex(next)
        return next
      })
      setAnimKey((k) => k + 1)
    }
  }

  const handleClose = () => {
    setQuizIndex(qIndex)
    setFocusPlanet(null)
    setStep('explore')
  }

  const isFourOptions = quiz.options.length === 4

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto p-4 bg-[rgba(0,0,0,0.3)]"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      role="dialog"
      aria-label={`Câu đố về ${planet.name}`}
    >
      <motion.div
        key={animKey}
        className="bg-[rgba(16,20,42,0.92)] backdrop-blur-xl
                   rounded-3xl border border-[rgba(255,255,255,0.1)]
                   shadow-[0_0_80px_rgba(80,120,255,0.12)]
                   max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="pt-4 pb-3 flex flex-col items-center">
          <QuizPlanet3D planetId={planet.id} />
          <div className="flex items-center gap-2 mb-1 -mt-1">
            {PlanetIcon && <PlanetIcon width={28} height={28} aria-hidden="true" />}
            <span className="text-xl font-bold text-white">{planet.name}</span>
          </div>
          <p className="text-xs text-[#7a8aaa]">{planet.nickname}</p>
        </div>

        <div className="relative px-6 mb-5">
          <div className="h-1.5 bg-[#1a2444] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ffc864] to-[#ffd84d] rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((qIndex + (showResult ? 1 : 0)) / planet.quiz.length) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="px-6 mb-5">
          <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-4 border border-[rgba(255,255,255,0.05)]">
            <p className="text-base font-semibold text-[#d8e0ff] leading-relaxed text-center">
              {quiz.question}
            </p>
          </div>
        </div>

        <div
          className={
            isFourOptions
              ? 'px-6 grid grid-cols-2 gap-2.5 mb-5'
              : 'px-6 flex flex-col gap-2.5 mb-5'
          }
        >
          {quiz.options.map((opt, i) => {
            let optionStyle: React.CSSProperties = {}
            let extraMark = ''

            if (selected !== null) {
              if (i === quiz.correct) {
                optionStyle = {
                  borderColor: 'rgba(120,255,170,0.6)',
                  backgroundColor: 'rgba(120,255,170,0.1)',
                  color: '#8cffaa',
                }
                extraMark = ' ✓'
              } else if (i === selected) {
                optionStyle = {
                  borderColor: 'rgba(255,110,110,0.6)',
                  backgroundColor: 'rgba(255,110,110,0.1)',
                  color: '#ff8888',
                }
                extraMark = ' ✗'
              } else {
                optionStyle = {
                  borderColor: 'rgba(255,255,255,0.04)',
                  color: '#4a5a7a',
                }
              }
            }

            const showShake = showResult && i === selected && !isCorrect

            return (
              <motion.button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`cursor-pointer rounded-xl border px-4 py-3
                           text-sm font-semibold text-left
                           disabled:cursor-default
                           ${showShake ? 'animate-shake' : ''}
                           ${selected === null
                             ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(150,180,255,0.4)] hover:bg-[rgba(150,180,255,0.08)] text-[#b0b8d0]'
                             : ''
                           }`}
                style={optionStyle}
                variants={staggerOption}
                initial="initial"
                animate="animate"
                custom={i}
                whileTap={{ scale: 0.96 }}
                aria-label={`Đáp án ${optionLabels[i]}: ${opt}`}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full
                               bg-[rgba(255,255,255,0.08)] mr-2 text-xs font-bold">
                  {optionLabels[i]}
                </span>
                {opt}
                {extraMark}
              </motion.button>
            )
          })}
        </div>

        <div className="px-6 pb-2 flex items-center justify-between text-xs text-[#5a6a8a]">
          <span>Câu {qIndex + 1}/{planet.quiz.length}</span>
          <span className="flex items-center gap-1 text-[#ffc864] font-bold">
            <span className="text-sm">⭐</span> {score}
          </span>
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              className="px-6 pb-6"
              initial={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className={`text-center rounded-2xl py-3 px-4 mb-4 border ${
                  isCorrect
                    ? 'bg-[rgba(120,255,170,0.05)] border-[rgba(120,255,170,0.15)]'
                    : 'bg-[rgba(255,150,100,0.05)] border-[rgba(255,150,100,0.12)]'
                }`}
              >
                <p className="text-2xl mb-1">{isCorrect ? '🎉' : '🤔'}</p>
                <p
                  className={`font-bold text-base ${
                    isCorrect ? 'text-[#7cffa4]' : 'text-[#ffaa88]'
                  }`}
                >
                  {isCorrect ? 'Xuất sắc!' : 'Gần đúng rồi!'}
                </p>
                <p className="text-xs text-[#6a7a9a] mt-0.5">
                  {isCorrect
                    ? 'Min Cute thật thông minh!'
                    : 'Đừng lo, học hỏi là quan trọng nhất!'}
                </p>
              </div>

              <motion.button
                onClick={handleNext}
                className="w-full cursor-pointer rounded-full py-3.5 text-sm font-bold
                           bg-gradient-to-r from-[#4d8fff] to-[#7c5cff]
                           text-white shadow-[0_0_25px_rgba(100,120,255,0.35)]
                           active:scale-[0.96]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isLast ? 'Nhận huy hiệu' : 'Câu tiếp theo'}
              >
                {isLast ? 'Nhận Huy Hiệu 🏆' : 'Câu Tiếp Theo ➡️'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}