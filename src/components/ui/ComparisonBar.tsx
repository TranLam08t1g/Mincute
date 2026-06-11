import { motion } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'

export function ComparisonBar() {
  const badges = useKidStore((s) => s.badges)

  const doneCount = badges.length

  return (
    <div
      className="fixed top-4 right-4 z-10 pointer-events-none"
      role="status"
      aria-label={`Đã khám phá ${doneCount}/8 hành tinh`}
    >
      <div
        className="bg-[rgba(15,18,40,0.8)] backdrop-blur-md rounded-full
                    border border-[rgba(255,255,255,0.06)] px-3 py-2
                    flex items-center gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
      >
        <span className="text-[10px] text-[#5a6a8a] font-semibold mr-1">
          {doneCount}/8
        </span>
        {KID_PLANETS.slice(0, 8).map((p) => {
          const hasBadge = badges.includes(p.id)
          const PlanetIcon = getPlanetIcon(p.id)

          return (
            <motion.div
              key={p.id}
              animate={{
                scale: hasBadge ? 1.1 : 0.75,
                opacity: hasBadge ? 1 : 0.25,
                filter: hasBadge
                  ? 'drop-shadow(0 0 4px rgba(255,200,100,0.4))'
                  : 'grayscale(1)',
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              title={hasBadge ? `${p.name} - Đã khám phá` : p.name}
            >
              {PlanetIcon ? (
                <PlanetIcon width={18} height={18} aria-hidden="true" />
              ) : (
                <span className="text-sm">{p.emoji}</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}