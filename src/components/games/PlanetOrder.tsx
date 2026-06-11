import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'
import { RobotGuideAvatar } from '../ui/RobotGuideAvatar'
import { GameResult } from './GameResult'

const planets = KID_PLANETS.slice(0, 8)

export function PlanetOrder() {
  const setCurrentGame = useKidStore((s) => s.setCurrentGame)
  const addStars = useKidStore((s) => s.addStars)
  const setHighScore = useKidStore((s) => s.setHighScore)

  const [slots, setSlots] = useState<(string | null)[]>(Array(8).fill(null))
  const [available, setAvailable] = useState(() =>
    planets.map((p) => p.id).sort(() => Math.random() - 0.5)
  )
  const [dragging, setDragging] = useState<string | null>(null)
  const [errors, setErrors] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [moves, setMoves] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval>>(0)

  useEffect(() => {
    if (started && !done) {
      timerRef.current = setInterval(() => setElapsed((t) => t + 1), 1000)
      return () => clearInterval(timerRef.current)
    }
  }, [started, done])

  const handleDragStart = useCallback((planetId: string) => {
    setDragging(planetId)
    setStarted(true)
  }, [])

  const handleDrop = useCallback((slotIndex: number) => {
    if (!dragging) return
    setMoves((m) => m + 1)

    const correctPlanet = planets[slotIndex].id
    if (dragging === correctPlanet) {
      setSlots((prev) => {
        const next = [...prev]
        next[slotIndex] = dragging
        return next
      })
      setAvailable((prev) => prev.filter((id) => id !== dragging))
      setErrors((prev) => prev.filter((i) => i !== slotIndex))
    } else {
      setErrors((prev) => [...prev.filter((i) => i !== slotIndex), slotIndex])
      setTimeout(() => {
        setErrors((prev) => prev.filter((i) => i !== slotIndex))
      }, 600)
    }
    setDragging(null)

    setSlots((prev) => {
      const allFilled = prev.every((s) => s !== null)
      if (allFilled && prev[slotIndex] !== dragging) {
        const nextSlots = [...prev]
        nextSlots[slotIndex] = dragging
        const remaining = available.filter((id) => id !== dragging)
        if (remaining.length === 0 && nextSlots.every((s, i) => s === planets[i].id)) {
          setTimeout(() => setDone(true), 400)
          setTimeout(() => setShowResult(true), 800)
        }
        return nextSlots
      }
      if (allFilled) {
        setTimeout(() => setDone(true), 400)
        setTimeout(() => setShowResult(true), 800)
      }
      return prev
    })
    setAvailable((prev) => prev.filter((id) => id !== dragging))

    setSlots((currentSlots) => {
      const filled = currentSlots.filter((s) => s !== null).length + 1
      if (filled >= 8) {
        setTimeout(() => setDone(true), 300)
        setTimeout(() => setShowResult(true), 700)
      }
      return currentSlots
    })
  }, [dragging, available])

  const starCount = elapsed < 30 ? 3 : elapsed < 60 ? 2 : 1

  useEffect(() => {
    if (showResult) {
      clearInterval(timerRef.current)
      const finalScore = Math.max(0, Math.round(100 - moves * 5 - elapsed * 0.5))
      setHighScore('order', finalScore > 50 ? finalScore : 0)
      const stars = elapsed < 30 ? 3 : elapsed < 60 ? 2 : 1
      addStars(stars)
    }
  }, [showResult])

  const handleReplay = () => {
    setSlots(Array(8).fill(null))
    setAvailable(planets.map((p) => p.id).sort(() => Math.random() - 0.5))
    setDone(false)
    setShowResult(false)
    setStarted(false)
    setElapsed(0)
    setMoves(0)
    setErrors([])
  }

  const finalScore = Math.max(0, Math.round(100 - moves * 5 - elapsed * 0.5))

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

      <motion.div className="flex items-center gap-2 mb-8" initial={{ y: -10 }} animate={{ y: 0 }}>
        <RobotGuideAvatar mood={done ? 'celebrate' : 'think'} width={40} height={40} />
        <span className="text-sm text-[#b0b8d0]">
          {done ? 'Min giỏi quá!' : 'Kéo hành tinh vào đúng vị trí nha!'}
        </span>
      </motion.div>

      <div className="flex flex-col gap-2 mb-8 max-w-md w-full">
        {Array.from({ length: 8 }).map((_, i) => {
          const planetInSlot = slots[i]
          const planetData = planetInSlot ? KID_PLANETS.find((p) => p.id === planetInSlot) : null
          const Icon = planetInSlot ? getPlanetIcon(planetInSlot) : null
          const hasError = errors.includes(i)

          return (
            <motion.div
              key={i}
              className={`h-12 rounded-2xl border-2 border-dashed flex items-center px-4 transition-colors
                         ${planetInSlot ? 'border-[rgba(100,200,255,0.3)] bg-[rgba(100,200,255,0.05)]' :
                           hasError ? 'border-red-500/40 bg-[rgba(255,100,100,0.04)]' :
                           'border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]'}`}
              animate={hasError ? { x: [0, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
            >
              <span className="text-xs text-[#3a4a6a] w-6">{i + 1}</span>
              {planetData && Icon ? (
                <div className="flex items-center gap-2">
                  <Icon width={24} height={24} />
                  <span className="text-sm font-semibold text-white">{planetData.name}</span>
                </div>
              ) : (
                <span className="text-xs text-[#3a4a6a] italic">
                  {i === 0 ? 'Gần Mặt Trời nhất' : i === 7 ? 'Xa Mặt Trời nhất' : 'Vị trí ' + (i + 1)}
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {!done && (
        <div className="flex flex-wrap justify-center gap-3 max-w-md">
          {available.map((planetId) => {
            const planetData = KID_PLANETS.find((p) => p.id === planetId)!
            const Icon = getPlanetIcon(planetId)
            return (
              <motion.div
                key={planetId}
                className={`cursor-grab active:cursor-grabbing bg-[rgba(255,255,255,0.04)]
                           rounded-xl px-4 py-2.5 border border-[rgba(255,255,255,0.08)]
                           flex items-center gap-2 select-none hover:bg-[rgba(255,255,255,0.08)]
                           transition-colors ${dragging === planetId ? 'opacity-50 scale-95' : ''}`}
                draggable
                onDragStart={() => handleDragStart(planetId)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {Icon && <Icon width={22} height={22} />}
                <span className="text-sm font-semibold text-[#d0d8ff]">{planetData.name}</span>
              </motion.div>
            )
          })}
        </div>
      )}

      {started && !done && (
        <p className="mt-4 text-xs text-[#5a6a8a]">
          ⏱ {elapsed}s
        </p>
      )}

      {showResult && (
        <GameResult
          gameId="order"
          gameName="Xếp Đội Hình Vũ Trụ"
          score={finalScore}
          maxScore={100}
          stars={starCount}
          onReplay={handleReplay}
        />
      )}
    </div>
  )
}