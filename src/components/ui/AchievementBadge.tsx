import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'
import { RobotGuideAvatar } from './RobotGuideAvatar'

function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  const start = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#ffd84d', '#ff7b42', '#ff4d7a', '#7ed6ff', '#4d9de0', '#7cffa4', '#ff9abc']
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; color: string; life: number; rotation: number; rv: number
    }> = []

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 6,
        vy: -(Math.random() * 8 + 4),
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        rotation: Math.random() * Math.PI * 2,
        rv: (Math.random() - 0.5) * 0.2,
      })
    }

    let startTime = 0
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = (time - startTime) / 1000
      if (elapsed > 3) return (rafRef.current = 0)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.life = Math.max(0, 1 - elapsed / 2.5)
        p.vy += 0.15
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rv

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    start()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [start])

  return canvasRef
}

export function AchievementBadge() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const setStep = useKidStore((s) => s.setStep)
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const badges = useKidStore((s) => s.badges)

  const planet = KID_PLANETS.find((p) => p.id === focusPlanet)
  const PlanetIcon = planet ? getPlanetIcon(planet.id) : null
  const canvasRef = useConfetti()

  if (!planet) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setFocusPlanet(null)
          setStep('explore')
        }
      }}
      role="dialog"
      aria-label={`Huy hiệu cho ${planet.name}`}
    >
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      <motion.div
        className="bg-[rgba(15,18,40,0.97)] backdrop-blur-xl
                   rounded-3xl border border-[rgba(255,200,100,0.25)]
                   shadow-[0_0_80px_rgba(255,180,60,0.25)]
                   max-w-sm w-full p-8 text-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.5, opacity: 0, rotateY: 40 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[rgba(255,200,100,0.08)] to-transparent pointer-events-none"
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="mb-4 flex items-center justify-center gap-4"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 12, delay: 0.2 }}
        >
          {PlanetIcon ? (
            <PlanetIcon width={56} height={56} aria-hidden="true" />
          ) : (
            <span className="text-5xl">{planet.emoji}</span>
          )}
          <div className="flex flex-col items-center">
            <RobotGuideAvatar mood="celebrate" width={40} height={40} />
            <span className="text-[9px] text-[#7a8aaa] mt-1">Gia Khiêm</span>
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-[#ffd84d] mb-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {planet.name}
        </motion.h2>

        <motion.p
          className="text-sm text-[#7a8aaa] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {planet.nickname}
        </motion.p>

        <motion.div
          className="bg-[rgba(255,200,100,0.08)] rounded-2xl p-4 mb-5 border border-[rgba(255,200,100,0.15)]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 200 }}
        >
          <p className="text-3xl mb-1">🏆</p>
          <p className="text-sm font-bold text-[#ffd84d]">HUY HIỆU ĐÃ NHẬN!</p>
          <p className="text-xs text-[#7a8aaa] mt-1">
            Gia Khiêm: "Min giỏi quá! Bạn đã khám phá thành công {planet.name}!"
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {badges.map((id, i) => {
            const bp = KID_PLANETS.find((p) => p.id === id)
            return bp ? (
              <motion.span
                key={id}
                className="text-2xl opacity-90"
                title={bp.name}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 300 }}
              >
                {bp.emoji}
              </motion.span>
            ) : null
          })}
        </div>

        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-xs text-[#5a6a8a] mb-2">Đã khám phá: {badges.length} / 8 hành tinh</p>
          <div className="h-2 bg-[#1a2444] rounded-full overflow-hidden max-w-[200px] mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ffc864] to-[#ffd84d] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(badges.length / 8) * 100}%` }}
              transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        <motion.button
          onClick={() => {
            setFocusPlanet(null)
            setStep('explore')
          }}
          className="w-full cursor-pointer rounded-full py-3 text-sm font-bold
                     bg-gradient-to-r from-[#ff7b42] to-[#ff4d7a]
                     text-white shadow-[0_0_20px_rgba(255,100,80,0.3)]
                     active:scale-[0.96]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          aria-label="Khám phá tiếp"
        >
          {badges.length >= 8 ? 'KHÁM PHÁ TIẾP' : 'KHÁM PHÁ TIẾP 🚀'}
        </motion.button>
      </motion.div>
    </div>
  )
}