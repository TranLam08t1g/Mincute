import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { RobotGuideAvatar } from './RobotGuideAvatar'

type RobotMood = 'idle' | 'wave' | 'happy' | 'think' | 'celebrate'

const safePositions = [
  { x: '4%', y: '15%' },
  { x: '88%', y: '12%' },
  { x: '4%', y: '55%' },
  { x: '88%', y: '50%' },
  { x: '10%', y: '78%' },
  { x: '86%', y: '75%' },
]

const quizPositions = [
  { x: 'calc(100% - 60px)', y: '25%' },
  { x: 'calc(100% - 60px)', y: '40%' },
  { x: '16px', y: '30%' },
]

const badgePosition = { x: 'calc(50% + 160px)', y: '12%' }

function getRandomSafePosition(currentX: string, currentY: string) {
  const others = safePositions.filter((p) => p.x !== currentX || p.y !== currentY)
  if (others.length === 0) return safePositions[0]
  return others[Math.floor(Math.random() * others.length)]
}

export function FloatingRobot() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const badges = useKidStore((s) => s.badges)
  const step = useKidStore((s) => s.step)

  const [position, setPosition] = useState(safePositions[1])
  const [showBubble, setShowBubble] = useState(true)
  const [bubbleVisible, setBubbleVisible] = useState(true)
  const [mood, setMood] = useState<RobotMood>('idle')
  const [lastClick, setLastClick] = useState(0)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>(0)
  const wasInQuiz = useRef(false)

  const getMessage = useCallback((): string => {
    if (step === 'quiz') return 'Chọn đáp án đúng nhất nhé Min! *bíp bíp*'
    if (focusPlanet) return 'Bạn muốn khám phá hành tinh này hả Min? Tuyệt!'
    if (badges.length === 0) return 'Chào Min! Tớ là Gia Khiêm nè. Chạm vào hành tinh để bắt đầu nha! ⚡'
    if (badges.length >= 8) return 'Woa Min giỏi quá! Bạn đã khám phá hết cả hệ Mặt Trời rồi! 🏆'
    return `Tuyệt vời Min ơi! Còn ${8 - badges.length} hành tinh nữa nha!`
  }, [step, focusPlanet, badges.length])

  const handleRobotClick = useCallback(() => {
    const now = Date.now()
    if (now - lastClick < 800) return
    setLastClick(now)
    setShowBubble(true)
    setBubbleVisible(true)
    setMood('wave')
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    bubbleTimer.current = setTimeout(() => {
      setBubbleVisible(false)
      setTimeout(() => setShowBubble(false), 400)
    }, 4000)
    setTimeout(() => {
      setMood((prev) => (prev === 'wave' ? 'idle' : prev))
    }, 1500)
  }, [lastClick])

  useEffect(() => {
    if (step === 'quiz') {
      wasInQuiz.current = true
      setMood('think')
      const qp = quizPositions[Math.floor(Math.random() * quizPositions.length)]
      setPosition(qp)
      return () => { wasInQuiz.current = false }
    } else if (step === 'badge') {
      setMood('celebrate')
      setPosition(badgePosition)
      return
    } else if (step === 'story' && focusPlanet) {
      setMood('happy')
      setPosition(safePositions[1])
      return
    } else {
      setMood('idle')
    }
  }, [step, focusPlanet])

  useEffect(() => {
    if (step === 'quiz' || step === 'badge') return

    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const next = getRandomSafePosition(prev.x, prev.y)
        return next
      })
      if (Math.random() > 0.5) {
        setMood((prev) => (prev === 'idle' ? 'happy' : 'idle'))
      }
    }, 9000 + Math.random() * 7000)

    return () => clearInterval(moveInterval)
  }, [step])

  useEffect(() => {
    if (step === 'explore') {
      const timer = setTimeout(() => setShowBubble(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [step])

  useEffect(() => {
    if (bubbleVisible && step !== 'quiz' && step !== 'badge') {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
      bubbleTimer.current = setTimeout(() => {
        setBubbleVisible(false)
        setTimeout(() => setShowBubble(false), 400)
      }, 5000)
    }
    return () => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    }
  }, [step, focusPlanet, badges.length, bubbleVisible])

  const isQuizOrBadge = step === 'quiz' || step === 'badge'

  return (
    <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden" aria-live="polite">
      <motion.div
        className="absolute pointer-events-auto cursor-pointer select-none"
        style={{ left: position.x, top: position.y }}
        animate={{
          left: position.x,
          top: position.y,
          y: [0, -8, 0],
        }}
        transition={{
          left: { duration: 2.5, ease: [0.34, 1.56, 0.64, 1] },
          top: { duration: 2.5, ease: [0.34, 1.56, 0.64, 1] },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        onClick={handleRobotClick}
        title="Gia Khiêm - Người bạn robot AI"
      >
        <motion.div
          animate={{ rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <RobotGuideAvatar mood={mood} width={64} height={64} />

          {!isQuizOrBadge && (
            <motion.div
              className="absolute -top-1 right-0 w-3 h-3 rounded-full bg-[#ff7b42]"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        <motion.div
          className="absolute -top-1.5 -right-1.5 text-[10px] font-bold text-white bg-[#ff7b42] rounded-full w-4 h-4 flex items-center justify-center shadow-[0_0_6px_rgba(255,123,66,0.5)]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          !
        </motion.div>

        <AnimatePresence>
          {showBubble && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none"
              initial={bubbleVisible ? { opacity: 0, y: 8, scale: 0.9 } : {}}
              animate={bubbleVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -4, scale: 0.95 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative bg-white rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.25)] min-w-[140px] max-w-[220px]">
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                <p className="text-xs font-semibold text-[#1a2456] leading-relaxed whitespace-pre-wrap text-center">
                  {getMessage()}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}