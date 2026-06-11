import { motion } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'

export function ComparisonBar() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const badges = useKidStore((s) => s.badges)

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none
                  max-sm:bottom-20 max-sm:scale-90"
      role="status"
      aria-label="Tiến độ khám phá hành tinh"
    >
      <div
        className="bg-[rgba(15,18,40,0.85)] backdrop-blur-md rounded-full
                    border border-[rgba(255,255,255,0.08)] px-5 py-2.5
                    flex items-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
      >
        {KID_PLANETS.map((p) => {
          const isFocused = focusPlanet === p.id
          const hasBadge = badges.includes(p.id)
          const PlanetIcon = getPlanetIcon(p.id)

          return (
            <motion.div
              key={p.id}
              className="flex items-center"
              initial={false}
              animate={{
                scale: hasBadge ? 1.15 : isFocused ? 1.05 : 0.85,
                opacity: hasBadge ? 1 : isFocused ? 0.7 : 0.3,
                filter: hasBadge
                  ? 'drop-shadow(0 0 6px rgba(255,200,100,0.5))'
                  : isFocused
                    ? 'none'
                    : 'grayscale(1)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              title={hasBadge ? `${p.name} - Đã khám phá` : p.name}
            >
              {PlanetIcon ? (
                <PlanetIcon width={24} height={24} aria-hidden="true" />
              ) : (
                <span className="text-lg">{p.emoji}</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}