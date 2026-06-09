import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'

export function ComparisonBar() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const badges = useKidStore((s) => s.badges)

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none
                    max-sm:bottom-20 max-sm:scale-90">
      <div className="bg-[rgba(15,18,40,0.85)] backdrop-blur-md rounded-full
                      border border-[rgba(255,255,255,0.08)] px-5 py-2.5
                      flex items-center gap-3">
        {KID_PLANETS.map((p) => {
          const isFocused = focusPlanet === p.id
          const hasBadge = badges.includes(p.id)
          return (
            <div
              key={p.id}
              className={`text-lg transition-all duration-300 ${
                hasBadge
                  ? 'opacity-100 scale-110 drop-shadow-[0_0_6px_rgba(255,200,100,0.5)]'
                  : isFocused
                    ? 'opacity-80'
                    : 'opacity-30 grayscale'
              }`}
              title={hasBadge ? `${p.name} ✅` : p.name}
            >
              {p.emoji}
            </div>
          )
        })}
      </div>
    </div>
  )
}