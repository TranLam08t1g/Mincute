import { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { MinCuteAvatar } from '../ui/MinCuteAvatar'

function FloatingEmoji({ emoji, x, y, delay, size }: { emoji: string; x: string; y: string; delay: number; size: string }) {
  return (
    <motion.span
      className={`absolute ${size} pointer-events-none select-none opacity-40`}
      style={{ left: x, top: y }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: [0, -20, 0], opacity: [0, 0.45, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      {emoji}
    </motion.span>
  )
}

const particles = [
  { emoji: '⭐', x: '5%', y: '10%', delay: 0, size: 'text-4xl' },
  { emoji: '✨', x: '88%', y: '14%', delay: 0.7, size: 'text-3xl' },
  { emoji: '💫', x: '10%', y: '35%', delay: 1.4, size: 'text-2xl' },
  { emoji: '🪐', x: '8%', y: '72%', delay: 2.0, size: 'text-4xl' },
  { emoji: '🌙', x: '90%', y: '75%', delay: 1.2, size: 'text-3xl' },
  { emoji: '🌍', x: '80%', y: '50%', delay: 2.5, size: 'text-2xl' },
]

export function KidHero() {
  const step = useKidStore((s) => s.step)
  const setStep = useKidStore((s) => s.setStep)
  const [exiting, setExiting] = useState(false)
  const [mounted, setMounted] = useState(true)

  const handleStart = useCallback(() => {
    setExiting(true)
    setTimeout(() => setStep('explore'), 400)
  }, [setStep])

  useEffect(() => {
    if (step !== 'hero' && exiting) {
      const timer = setTimeout(() => setMounted(false), 800)
      return () => clearTimeout(timer)
    }
  }, [step, exiting])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-[#0a0a2e]/70 via-[#1a1040]/55 to-[#0d1b3e]/70 backdrop-blur-[2px]"
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, scale: 0.96 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((p, i) => (
          <FloatingEmoji key={i} {...p} />
        ))}
      </div>

      <div className="relative z-10">
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
        >
          <MinCuteAvatar mood="happy" size={96} />
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] rounded-full px-5 py-2 border border-[rgba(255,255,255,0.1)] mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
        >
          <span className="w-5 h-5 rounded-full bg-[#ffd84d] shadow-[0_0_8px_rgba(255,216,77,0.5)]" />
          <span className="text-sm text-[#bcc4e0] font-semibold">
            Phi hành gia Min Cute
          </span>
        </motion.div>

        <motion.h1
          className="font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-5 tracking-tight leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-[#ffd84d] drop-shadow-[0_0_25px_rgba(255,216,77,0.5)]">
            Khám Phá
          </span>
          <br />
          <span className="text-[#7ed6ff] drop-shadow-[0_0_25px_rgba(126,214,255,0.5)]">
            Vũ Trụ
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-[#c0ccf0] mb-3 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Chào mừng phi hành gia{' '}
          <span className="text-[#ffd84d] font-bold drop-shadow-[0_0_12px_rgba(255,216,77,0.4)]">
            Min Cute
          </span>
          ! 🌌
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-[#8899bb] mb-12 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Hành trình kỳ thú qua 8 hành tinh trong hệ Mặt Trời. Nhấp vào
          từng hành tinh, giải câu đố vui và sưu tầm huy hiệu nào!
        </motion.p>

        <motion.button
          onClick={handleStart}
          className="cursor-pointer rounded-full px-14 py-5 text-xl font-bold
                     bg-gradient-to-r from-[#ff7b42] via-[#ff5e7a] to-[#ff4d7a]
                     text-white shadow-[0_0_40px_rgba(255,100,80,0.45)]
                     transition-all duration-300 hover:scale-110
                     hover:shadow-[0_0_60px_rgba(255,100,80,0.6)]
                     active:scale-95"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Bắt đầu hành trình khám phá vũ trụ"
        >
          BẮT ĐẦU HÀNH TRÌNH 🚀
        </motion.button>

        <motion.div
          className="mt-14 flex gap-4 text-3xl opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <span className="animate-twinkle" style={{ animationDelay: '0s' }} aria-hidden="true">⭐</span>
          <span className="animate-twinkle" style={{ animationDelay: '0.5s' }} aria-hidden="true">🌍</span>
          <span className="animate-twinkle" style={{ animationDelay: '1s' }} aria-hidden="true">🪐</span>
          <span className="animate-twinkle" style={{ animationDelay: '1.5s' }} aria-hidden="true">💫</span>
          <span className="animate-twinkle" style={{ animationDelay: '2s' }} aria-hidden="true">🌙</span>
        </motion.div>
      </div>
    </motion.div>
  )
}