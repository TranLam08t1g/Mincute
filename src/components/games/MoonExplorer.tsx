import { useState, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getMoonsForPlanet } from '../../data/moons'
import { getPlanetIcon } from '../../data/planet-icons'
import { RobotGuideAvatar } from '../ui/RobotGuideAvatar'
import { GameResult } from './GameResult'

const planetsWithMoons = KID_PLANETS.filter((p) => getMoonsForPlanet(p.id).length > 0)

export function MoonExplorer() {
  const setCurrentGame = useKidStore((s) => s.setCurrentGame)
  const addStars = useKidStore((s) => s.addStars)
  const setHighScore = useKidStore((s) => s.setHighScore)

  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null)
  const [exploredMoons, setExploredMoons] = useState<Set<string>>(new Set())
  const [activeMoonId, setActiveMoonId] = useState<string | null>(null)
  const [quizMode, setQuizMode] = useState(false)
  const [quizQIndex, setQuizQIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const planet = selectedPlanetId ? KID_PLANETS.find((p) => p.id === selectedPlanetId) : null
  const moons = selectedPlanetId ? getMoonsForPlanet(selectedPlanetId) : []
  const PlanetIcon = planet ? getPlanetIcon(planet.id) : null
  const activeMoon = activeMoonId ? moons.find((m) => m.id === activeMoonId) : null

  const totalExplored = exploredMoons.size
  const totalMoons = moons.length
  const allExplored = totalExplored >= totalMoons && totalMoons > 0

  const exploreMoon = useCallback((moonId: string) => {
    setActiveMoonId(moonId)
    setExploredMoons((prev) => new Set([...prev, moonId]))
  }, [])

  const startQuiz = () => setQuizMode(true)

  const quizQuestions = moons.map((m) => ({
    question: `${m.name} thuộc hành tinh nào?`,
    options: [planet?.name ?? '', ...KID_PLANETS.filter((p) => p.id !== selectedPlanetId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((p) => p.name)],
    correct: 0,
  }))

  const handleQuizAnswer = useCallback((i: number) => {
    if (quizAnswered !== null) return
    setQuizAnswered(i)
    if (i === 0) setQuizScore((s) => s + 1)

    setTimeout(() => {
      setQuizAnswered(null)
      if (quizQIndex >= quizQuestions.length - 1) {
        setFinished(true)
        setShowResult(true)
      } else {
        setQuizQIndex((q) => q + 1)
      }
    }, 1200)
  }, [quizAnswered, quizQIndex, quizQuestions.length])

  const handleFinish = () => {
    setFinished(true)
    setShowResult(true)
  }

  useEffect(() => {
    if (finished && showResult) {
      const finalScore = totalExplored * 10 + quizScore * 15
      setHighScore('moon', finalScore)
      const stars = totalExplored >= totalMoons && quizScore >= totalMoons * 0.7 ? 3 :
        totalExplored >= Math.ceil(totalMoons * 0.6) ? 2 : 1
      addStars(stars)
    }
  }, [finished, showResult])

  const starCount = totalExplored >= totalMoons && quizScore >= totalMoons * 0.7 ? 3 :
    totalExplored >= Math.ceil(totalMoons * 0.6) ? 2 : 1

  const finalScore = totalExplored * 10 + quizScore * 15

  const handleReplay = () => window.location.reload()

  if (finished && showResult) {
    return (
      <GameResult
        gameId="moon"
        gameName="Vệ Tinh Bí Ẩn"
        score={finalScore}
        maxScore={totalMoons * 25}
        stars={starCount}
        onReplay={handleReplay}
      />
    )
  }

  if (!selectedPlanetId) {
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
        >✕</button>

        <motion.div
          className="text-center mb-8"
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <RobotGuideAvatar mood="happy" width={48} height={48} />
          <h2 className="text-xl font-bold text-white mt-3 mb-1">Khám Phá Mặt Trăng</h2>
          <p className="text-sm text-[#7a8aaa]">Chọn một hành tinh có mặt trăng để bắt đầu</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
          {planetsWithMoons.map((p, i) => {
            const Icon = getPlanetIcon(p.id)
            const moonCount = getMoonsForPlanet(p.id).length
            return (
              <motion.button
                key={p.id}
                onClick={() => setSelectedPlanetId(p.id)}
                className="cursor-pointer rounded-2xl p-4 border border-[rgba(255,255,255,0.06)]
                           bg-[rgba(255,255,255,0.02)] flex flex-col items-center gap-2
                           hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.96] transition-all"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(150,180,255,0.2)' }}
              >
                {Icon && <Icon width={36} height={36} />}
                <span className="text-sm font-bold text-white">{p.name}</span>
                <span className="text-xs text-[#5a6a8a]">{moonCount} mặt trăng</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    )
  }

  if (quizMode) {
    const q = quizQuestions[quizQIndex]
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto p-4"
        style={{ background: 'radial-gradient(ellipse at center, rgba(20,28,60,0.95) 0%, rgba(8,13,31,0.98) 100%)' }}
      >
        <div className="max-w-sm w-full">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-[#b0b8d0]">Quiz {quizQIndex + 1}/{quizQuestions.length}</span>
            <span className="text-sm text-[#ffc864]">⭐ {quizScore}</span>
          </div>

          <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-4 border border-[rgba(255,255,255,0.05)] mb-4">
            <p className="text-base font-semibold text-[#f0f4ff] text-center">{q.question}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {q.options.map((opt, i) => {
              const correct = i === 0
              return (
                <motion.button
                  key={i}
                  onClick={() => handleQuizAnswer(i)}
                  disabled={quizAnswered !== null}
                  className="cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold
                             text-left disabled:cursor-default transition-all"
                  style={{
                    borderColor: quizAnswered !== null
                      ? correct ? 'rgba(120,255,170,0.5)' : quizAnswered === i ? 'rgba(255,110,110,0.5)' : 'rgba(255,255,255,0.04)'
                      : 'rgba(255,255,255,0.08)',
                    backgroundColor: quizAnswered !== null
                      ? correct ? 'rgba(120,255,170,0.08)' : quizAnswered === i ? 'rgba(255,110,110,0.06)' : 'rgba(255,255,255,0.01)'
                      : 'rgba(255,255,255,0.02)',
                  }}
                  whileHover={quizAnswered === null ? { scale: 1.02 } : {}}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg
                                 bg-[rgba(255,255,255,0.06)] mr-2 text-xs text-[#8899bb]">
                    {['A', 'B', 'C'][i]}
                  </span>
                  {opt}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center pointer-events-auto p-4"
      style={{ background: 'radial-gradient(ellipse at center, rgba(20,28,60,0.95) 0%, rgba(8,13,31,0.98) 100%)' }}
    >
      <div className="flex items-center justify-between w-full max-w-sm mb-4 px-2">
        <button
          onClick={() => setSelectedPlanetId(null)}
          className="text-sm text-[#7a8aaa] hover:text-white transition-colors"
        >
          ← Chọn hành tinh khác
        </button>
        <span className="text-xs text-[#ffc864] font-bold">
          🌙 {totalExplored}/{totalMoons}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-5">
        {PlanetIcon && <PlanetIcon width={32} height={32} />}
        <h2 className="text-lg font-bold text-white">{planet?.name}</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm w-full mb-6">
        {moons.map((moon, i) => {
          const isExplored = exploredMoons.has(moon.id)
          const isActive = activeMoonId === moon.id

          return (
            <motion.button
              key={moon.id}
              onClick={() => exploreMoon(moon.id)}
              className={`cursor-pointer rounded-2xl p-4 border text-left transition-all
                         ${isExplored ? 'border-[rgba(120,255,170,0.15)] bg-[rgba(120,255,170,0.03)]' :
                           isActive ? 'border-[rgba(150,180,255,0.3)] bg-[rgba(150,180,255,0.04)]' :
                           'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)]'}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{moon.type === 'ice' ? '❄️' : '🪨'}</span>
                <span className="text-sm font-bold text-white">{moon.name}</span>
                {isExplored && <span className="ml-auto text-xs">✓</span>}
              </div>
              <p className="text-[10px] text-[#5a6a8a] line-clamp-1">{moon.description}</p>
            </motion.button>
          )
        })}
      </div>

      {activeMoon && (
        <motion.div
          className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-4 border border-[rgba(255,255,255,0.06)] max-w-sm w-full mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <RobotGuideAvatar mood="happy" width={28} height={28} />
            <span className="text-sm font-bold text-[#7ed6ff]">{activeMoon.name}</span>
          </div>
          <p className="text-xs text-[#bcc4e0] leading-relaxed">{activeMoon.description}</p>
          {activeMoon.funFact && (
            <p className="text-xs text-[#ffc864] mt-2 italic">💡 {activeMoon.funFact}</p>
          )}
        </motion.div>
      )}

      {allExplored && !quizMode && (
        <motion.button
          onClick={startQuiz}
          className="cursor-pointer rounded-full py-3.5 px-8 text-sm font-bold
                     bg-gradient-to-r from-[#4d8fff] to-[#7c5cff]
                     text-white shadow-[0_0_20px_rgba(100,120,255,0.3)]
                     active:scale-[0.96] hover:scale-105 transition-all"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Làm Quiz Về Mặt Trăng 🎯
        </motion.button>
      )}

      {totalExplored >= totalMoons && !quizMode && !allExplored && (
        <motion.button
          onClick={handleFinish}
          className="mt-4 cursor-pointer rounded-full py-3 px-8 text-sm font-bold
                     border border-[rgba(255,255,255,0.15)] text-[#7a8aaa]
                     hover:text-white hover:border-[rgba(255,255,255,0.3)]
                     active:scale-[0.96] transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Kết Thúc 🏁
        </motion.button>
      )}
    </div>
  )
}