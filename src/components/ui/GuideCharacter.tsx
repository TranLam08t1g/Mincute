import { motion } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { MinCuteAvatar } from './MinCuteAvatar'

export function GuideCharacter() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const badges = useKidStore((s) => s.badges)
  const step = useKidStore((s) => s.step)

  let mood: 'wave' | 'happy' | 'think' | 'celebrate' = 'wave'
  let message = ''

  if (step === 'quiz') {
    mood = 'think'
    message = 'Chọn đáp án đúng nhất nhé Min Cute!'
  } else if (focusPlanet) {
    mood = 'happy'
    message = 'Bấm vào hành tinh để khám phá nào!'
  } else if (badges.length === 0) {
    mood = 'wave'
    message = 'Chào bạn! Hãy nhấn vào một hành tinh để bắt đầu!'
  } else if (badges.length >= 8) {
    mood = 'celebrate'
    message = 'Wow! Bạn đã khám phá tất cả rồi!'
  } else {
    mood = 'happy'
    message = `Tuyệt vời! Còn ${8 - badges.length} hành tinh nữa nhé!`
  }

  return (
    <div className="fixed left-6 bottom-40 z-10 pointer-events-none max-sm:left-2 max-sm:bottom-32" aria-live="polite">
      <div className="flex items-end gap-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <MinCuteAvatar mood={mood} size={64} />
        </motion.div>

        <motion.div
          key={message}
          className="bg-[rgba(20,24,50,0.9)] backdrop-blur-md rounded-2xl rounded-bl-none border border-[rgba(255,255,255,0.1)] px-4 py-3 max-w-[240px] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm text-[#d0d8ff] leading-relaxed">
            {message}
          </p>
        </motion.div>
      </div>
    </div>
  )
}