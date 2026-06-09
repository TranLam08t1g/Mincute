import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'

export function AchievementBadge() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const setStep = useKidStore((s) => s.setStep)
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const badges = useKidStore((s) => s.badges)

  const planet = KID_PLANETS.find((p) => p.id === focusPlanet)
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
    >
      <div
        className="animate-pop-in bg-[rgba(15,18,40,0.97)] backdrop-blur-xl
                   rounded-3xl border border-[rgba(255,200,100,0.2)]
                   shadow-[0_0_80px_rgba(255,180,60,0.25)]
                   max-w-sm w-full p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4 animate-bounce-subtle">{planet.emoji}</div>
        <h2 className="text-3xl font-bold text-[#ffd84d] mb-2">
          {planet.name}
        </h2>
        <p className="text-sm text-[#7a8aaa] mb-4">{planet.nickname}</p>

        <div className="bg-[rgba(255,200,100,0.08)] rounded-2xl p-4 mb-5 border border-[rgba(255,200,100,0.15)]">
          <p className="text-2xl mb-1">🏆</p>
          <p className="text-sm font-bold text-[#ffd84d]">HUY HIỆU ĐÃ NHẬN!</p>
          <p className="text-xs text-[#7a8aaa] mt-1">
            Bạn đã khám phá thành công {planet.name}!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {badges.map((id) => {
            const bp = KID_PLANETS.find((p) => p.id === id)
            return bp ? (
              <span key={id} className="text-2xl opacity-90" title={bp.name}>
                {bp.emoji}
              </span>
            ) : null
          })}
        </div>

        <p className="text-xs text-[#5a6a8a] mb-5">
          Đã khám phá: {badges.length} / 8 hành tinh
        </p>

        <button
          onClick={() => {
            setFocusPlanet(null)
            setStep('explore')
          }}
          className="w-full cursor-pointer rounded-full py-3 text-sm font-bold
                     bg-gradient-to-r from-[#ff7b42] to-[#ff4d7a]
                     text-white shadow-[0_0_20px_rgba(255,100,80,0.3)]
                     transition-all duration-300 hover:scale-105"
        >
          {badges.length >= 8 ? '🎉 KHÁM PHÁ TIẾP' : 'KHÁM PHÁ TIẾP 🚀'}
        </button>
      </div>
    </div>
  )
}