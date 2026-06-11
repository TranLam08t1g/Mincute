import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'
import { RobotGuideAvatar } from '../ui/RobotGuideAvatar'
import { GameResult } from './GameResult'

const TOTAL_ROUNDS = 5

interface Clue {
  text: string
  difficulty: number
}

function generateClues(planetId: string): Clue[] {
  const planet = KID_PLANETS.find((p) => p.id === planetId)!
  const allClues: Clue[] = [
    { text: `Tớ là hành tinh ${planet.type === 'rocky' ? 'đá' : planet.type === 'gas' ? 'khí khổng lồ' : 'băng'}`, difficulty: 1 },
    { text: `Khoảng cách từ Mặt Trời đến tớ là ${planet.distanceFromSun}`, difficulty: 2 },
    { text: `Nhiệt độ của tớ vào khoảng ${planet.temperature}`, difficulty: 2 },
    { text: `Tớ có ${planet.numberOfMoons} mặt trăng`, difficulty: planet.numberOfMoons > 10 ? 1 : 2 },
    { text: `Một năm trên tớ dài ${planet.orbitalPeriod}`, difficulty: 2 },
    { text: planet.funFacts?.[0] ?? planet.funFact ?? '', difficulty: 3 },
    { text: planet.funFacts?.[1] ?? '', difficulty: 3 },
    { text: planet.funFacts?.[2] ?? '', difficulty: 3 },
    { text: planet.nickname ?? '', difficulty: 1 },
    { text: planet.composition ?? '', difficulty: 3 },
    { text: `${planet.hasRing ? 'Tớ có vành đai tuyệt đẹp!' : 'Tớ không có vành đai'}`, difficulty: planet.hasRing ? 1 : 2 },
  ].filter((c) => c.text.length > 0)

  const shuffled = allClues.sort(() => Math.random() - 0.5)
  const hard = shuffled.filter((c) => c.difficulty === 3).slice(0, 1)
  const medium = shuffled.filter((c) => c.difficulty === 2).slice(0, 1)
  const easy = shuffled.filter((c) => c.difficulty === 1).slice(0, 1)

  return [hard[0], medium[0], easy[0]].filter(Boolean).slice(0, 3)
}

function getRandomPlanets(excludeId: string, count: number): string[] {
  return KID_PLANETS.filter((p) => p.id !== excludeId)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((p) => p.id)
}

function generateRound() {
  const answerId = KID_PLANETS[Math.floor(Math.random() * KID_PLANETS.length)].id
  const clues = generateClues(answerId)
  const wrongIds = getRandomPlanets(answerId, 3)
  const options = [answerId, ...wrongIds].sort(() => Math.random() - 0.5)
  return { answerId, clues, options }
}

export function WhoAmI() {
  const setCurrentGame = useKidStore((s) => s.setCurrentGame)
  const addStars = useKidStore((s) => s.addStars)
  const setHighScore = useKidStore((s) => s.setHighScore)

  const [rounds] = useState(() => Array.from({ length: TOTAL_ROUNDS }, generateRound))
  const [roundIndex, setRoundIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [clueIndex, setClueIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const round = rounds[roundIndex]
  const currentClues = round.clues.slice(0, clueIndex + 1)
  const maxClueIndex = round.clues.length - 1

  const handleGuess = useCallback((planetId: string) => {
    if (selected) return
    setSelected(planetId)
    setShowAnswer(true)

    const clueBonus = maxClueIndex - clueIndex
    if (planetId === round.answerId) {
      setScore((s) => s + 3 + clueBonus * 2)
    }

    setTimeout(() => {
      setShowAnswer(false)
      setSelected(null)
      setClueIndex(0)
      if (roundIndex >= TOTAL_ROUNDS - 1) {
        setFinished(true)
        setShowResult(true)
      } else {
        setRoundIndex((i) => i + 1)
      }
    }, 1800)
  }, [selected, roundIndex, round, clueIndex, maxClueIndex])

  const handleNextClue = useCallback(() => {
    if (clueIndex < maxClueIndex) {
      setClueIndex((i) => i + 1)
    }
  }, [clueIndex, maxClueIndex])

  useEffect(() => {
    if (finished && showResult) {
      setHighScore('guess', score)
      const stars = score >= 20 ? 3 : score >= 12 ? 2 : 1
      addStars(stars)
    }
  }, [finished, showResult])

  const starCount = score >= 20 ? 3 : score >= 12 ? 2 : 1

  const handleReplay = () => window.location.reload()

  if (finished && showResult) {
    return (
      <GameResult
        gameId="guess"
        gameName="Đố Vui Bí Ẩn"
        score={score}
        maxScore={30}
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

      <AnimatePresence mode="wait">
        <motion.div
          key={roundIndex + '-' + clueIndex}
          className="max-w-sm w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <RobotGuideAvatar mood="think" width={36} height={36} />
              <span className="text-sm text-[#b0b8d0]">Đố {roundIndex + 1}/{TOTAL_ROUNDS}</span>
            </div>
            <span className="text-sm font-bold text-[#ffc864]">⭐ {score}</span>
          </div>

          <p className="text-center text-[#5a6a8a] text-xs mb-4">
            Gia Khiêm đang nghĩ về một hành tinh...
          </p>

          <div className="flex flex-col gap-2 mb-6">
            {currentClues.map((clue, i) => (
              <motion.div
                key={i}
                className="bg-[rgba(100,150,255,0.06)] rounded-2xl p-4 border border-[rgba(100,150,255,0.12)]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full
                                 bg-[rgba(100,150,255,0.15)] text-[#7ed6ff] text-[10px] font-bold mt-0.5 flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#d0d8ff] leading-relaxed">{clue.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {clueIndex < maxClueIndex && !selected && (
            <motion.button
              onClick={handleNextClue}
              className="w-full cursor-pointer rounded-full py-3 text-sm font-bold
                         border border-[rgba(255,255,255,0.1)] text-[#7a8aaa]
                         hover:border-[rgba(255,255,255,0.3)] hover:text-white
                         active:scale-[0.96] transition-all mb-4"
              whileTap={{ scale: 0.96 }}
            >
              Thêm Gợi Ý 🔍 (bonus ít hơn)
            </motion.button>
          )}

          {showAnswer && (
            <motion.p
              className="text-center text-sm font-bold mb-4"
              style={{ color: selected === round.answerId ? '#7cffa4' : '#ffaa88' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {selected === round.answerId
                ? 'Chính xác! +' + (3 + (maxClueIndex - clueIndex) * 2) + ' điểm'
                : 'Sai rồi! Đó là ' + KID_PLANETS.find((p) => p.id === round.answerId)?.name}
            </motion.p>
          )}

          {!selected && clueIndex === maxClueIndex && (
            <p className="text-center text-xs text-[#ffc864] mb-4 italic">
              Đây là gợi ý cuối cùng! Đoán ngay thôi Min!
            </p>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {round.options.map((planetId) => {
              const p = KID_PLANETS.find((x) => x.id === planetId)!
              const Icon = getPlanetIcon(planetId)
              const isSelected = selected === planetId
              const isCorrect = planetId === round.answerId

              return (
                <motion.button
                  key={planetId}
                  onClick={() => handleGuess(planetId)}
                  disabled={selected !== null}
                  className="cursor-pointer rounded-xl border px-4 py-3 flex items-center gap-2
                             disabled:cursor-default transition-all"
                  style={{
                    borderColor: showAnswer
                      ? isCorrect ? 'rgba(120,255,170,0.5)' : isSelected ? 'rgba(255,110,110,0.5)' : 'rgba(255,255,255,0.04)'
                      : 'rgba(255,255,255,0.08)',
                    backgroundColor: showAnswer
                      ? isCorrect ? 'rgba(120,255,170,0.06)' : isSelected ? 'rgba(255,110,110,0.04)' : 'rgba(255,255,255,0.01)'
                      : 'rgba(255,255,255,0.02)',
                  }}
                  whileHover={!selected ? { scale: 1.03, borderColor: 'rgba(150,180,255,0.3)' } : {}}
                  whileTap={!selected ? { scale: 0.96 } : {}}
                >
                  {Icon && <Icon width={22} height={22} />}
                  <span className="text-sm font-semibold text-[#d0d8ff]">{p.name}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}