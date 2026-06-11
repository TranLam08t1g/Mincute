import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useKidStore } from '../../store/kidStore'

export function TouchHint() {
  const [visible, setVisible] = useState(true)
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const badges = useKidStore((s) => s.badges)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (focusPlanet || badges.length > 0) setVisible(false)
  }, [focusPlanet, badges.length])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: 2, duration: 0.5, ease: 'easeOut' }}
      >
        <div className="bg-[rgba(20,24,50,0.9)] backdrop-blur-md rounded-full
                        border border-[rgba(255,255,255,0.1)] px-6 py-3
                        flex items-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <motion.div
            className="w-8 h-8 rounded-full bg-[rgba(255,200,100,0.15)] flex items-center justify-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-lg">👆</span>
          </motion.div>
          <span className="text-sm font-semibold text-[#d0d8ff] whitespace-nowrap">
            Chạm vào một hành tinh để khám phá!
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}