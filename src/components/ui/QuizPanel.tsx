import { useState } from 'react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { QuizPlanet3D } from './QuizPlanet3D'

const optionEmojis = ['🅰', '🅱', '🅲']

export function QuizPanel() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const setStep = useKidStore((s) => s.setStep)
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const addBadge = useKidStore((s) => s.addBadge)

  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const planet = KID_PLANETS.find((p) => p.id === focusPlanet)
  if (!planet || planet.quiz.length === 0) {
    setStep('badge')
    if (focusPlanet) addBadge(focusPlanet)
    return null
  }

  const quiz = planet.quiz[qIndex]
  const isCorrect = selected === quiz?.correct
  const isLast = qIndex >= planet.quiz.length - 1
  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    setShowResult(true)
    if (i === quiz.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (isLast) {
      if (focusPlanet) addBadge(focusPlanet)
      setStep('badge')
    } else {
      setSelected(null)
      setShowResult(false)
      setQIndex((i) => i + 1)
      setAnimKey((k) => k + 1)
    }
  }

  const isFourOptions = quiz.options.length === 4

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setFocusPlanet(null)
          setStep('explore')
        }
      }}
    >
      <div
        key={animKey}
        className="animate-bounce-in bg-[rgba(16,20,42,0.92)] backdrop-blur-xl
                   rounded-3xl border border-[rgba(255,255,255,0.10)]
                   shadow-[0_0_80px_rgba(80,120,255,0.12)]
                   max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Planet 3D Hero */}
        <div className="pt-4 pb-3 flex flex-col items-center">
          <QuizPlanet3D planetId={planet.id} />

          <div className="flex items-center gap-2 mb-1 -mt-1">
            <span className="text-3xl">{planet.emoji}</span>
            <span className="text-xl font-bold text-white">
              {planet.name}
            </span>
          </div>
          <p className="text-xs text-[#7a8aaa]">{planet.nickname}</p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-5 px-6">
          {planet.quiz.map((_, i) => {
            const done = i < qIndex + (showResult ? 1 : 0)
            const current = i === qIndex && !showResult
            return (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  done
                    ? 'bg-[#ffc864] shadow-[0_0_7px_rgba(255,200,100,0.5)]'
                    : current
                      ? 'bg-[#8899bb] animate-pulse shadow-[0_0_5px_rgba(136,153,187,0.4)]'
                      : 'bg-[#2a3a5a]'
                }`}
              />
            )
          })}
        </div>

        {/* Question */}
        <div className="px-6 mb-5">
          <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-4 border border-[rgba(255,255,255,0.05)]">
            <p className="text-base font-semibold text-[#d8e0ff] leading-relaxed text-center">
              {quiz.question}
            </p>
          </div>
        </div>

        {/* Options */}
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
                extraMark = ' ✅'
              } else if (i === selected) {
                optionStyle = {
                  borderColor: 'rgba(255,110,110,0.6)',
                  backgroundColor: 'rgba(255,110,110,0.1)',
                  color: '#ff8888',
                }
                extraMark = ' ❌'
              } else {
                optionStyle = {
                  borderColor: 'rgba(255,255,255,0.04)',
                  color: '#4a5a7a',
                }
              }
            }

            const showShake = showResult && i === selected && !isCorrect

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`cursor-pointer rounded-xl border px-4 py-3
                           text-sm font-semibold text-left
                           transition-all duration-300
                           disabled:cursor-default
                           ${
                             showShake ? 'animate-shake' : ''
                           }
                           ${
                             selected === null
                               ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(150,180,255,0.4)] hover:bg-[rgba(150,180,255,0.08)] text-[#b0b8d0]'
                               : ''
                           }`}
                style={optionStyle}
              >
                <span className="mr-2 text-base">
                  {optionEmojis[i] ?? ['🅰', '🅱', '🅲', '🅳'][i]}
                </span>
                {opt}
                {extraMark}
              </button>
            )
          })}
        </div>

        {/* Score bar */}
        <div className="px-6 pb-2 flex items-center justify-between text-xs text-[#5a6a8a]">
          <span>
            Câu {qIndex + 1}/{planet.quiz.length}
          </span>
          <span className="flex items-center gap-1 text-[#ffc864] font-bold">
            <span className="text-sm">⭐</span> {score}
          </span>
        </div>

        {/* Result + Next */}
        {showResult && (
          <div className="px-6 pb-6 animate-slide-up">
            <div
              className={`text-center rounded-2xl py-3 px-4 mb-4 border ${
                isCorrect
                  ? 'bg-[rgba(120,255,170,0.05)] border-[rgba(120,255,170,0.15)]'
                  : 'bg-[rgba(255,150,100,0.05)] border-[rgba(255,150,100,0.12)]'
              }`}
            >
              <p className="text-2xl mb-1">
                {isCorrect ? '🎉' : '🤔'}
              </p>
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

            <button
              onClick={handleNext}
              className="w-full cursor-pointer rounded-full py-3.5 text-sm font-bold
                         bg-gradient-to-r from-[#4d8fff] to-[#7c5cff]
                         text-white shadow-[0_0_25px_rgba(100,120,255,0.35)]
                         transition-all duration-300 hover:scale-105
                         active:scale-95"
            >
              {isLast
                ? 'Nhận Huy Hiệu 🏆'
                : 'Câu Tiếp Theo ➡️'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}