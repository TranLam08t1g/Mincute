import { useState } from 'react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'

type TabKey = 'about' | 'facts' | 'compare'

export function PlanetStoryCard() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const setStep = useKidStore((s) => s.setStep)
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const [tab, setTab] = useState<TabKey>('about')

  const planet = KID_PLANETS.find((p) => p.id === focusPlanet)
  if (!planet) return null

  const tabs: { key: TabKey; label: string; emoji: string }[] = [
    { key: 'about', label: 'Thông tin', emoji: '📖' },
    { key: 'facts', label: 'Sự thật', emoji: '💡' },
    { key: 'compare', label: 'So sánh', emoji: '📏' },
  ]

  const badgeCls =
    'bg-[rgba(255,255,255,0.04)] rounded-xl p-2.5 text-center border border-[rgba(255,255,255,0.05)]'

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setFocusPlanet(null)
          setStep('explore')
        }
      }}
    >
      <div
        className="animate-slide-up bg-[rgba(14,18,40,0.82)] backdrop-blur-xl
                    rounded-t-3xl border-t border-x border-[rgba(255,255,255,0.1)]
                    shadow-[0_-10px_60px_rgba(0,0,0,0.4)]
                    max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mx-auto mt-3 mb-4 w-10 h-1 rounded-full opacity-50"
          style={{ backgroundColor: planet.color }}
        />

        <div className="px-6 pb-3 flex items-center gap-3">
          <span className="text-4xl">{planet.emoji}</span>
          <div>
            <h2 className="text-xl font-bold text-white">{planet.name}</h2>
            <p className="text-xs text-[#7a8aaa]">{planet.nickname}</p>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => {
                setFocusPlanet(null)
                setStep('explore')
              }}
              className="cursor-pointer w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)]
                         flex items-center justify-center text-[#7a8aaa]
                         hover:bg-[rgba(255,255,255,0.12)] hover:text-white
                         transition-all duration-200 text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 mb-4 grid grid-cols-4 gap-2">
          <div className={badgeCls}>
            <p className="text-[9px] text-[#5a6a8a] uppercase mb-0.5">
              Khoảng cách
            </p>
            <p className="text-xs font-bold text-[#ffc864]">
              {planet.distanceFromSun}
            </p>
          </div>
          <div className={badgeCls}>
            <p className="text-[9px] text-[#5a6a8a] uppercase mb-0.5">
              Chu kỳ
            </p>
            <p className="text-xs font-bold text-[#64b4ff]">
              {planet.orbitalPeriod}
            </p>
          </div>
          <div className={badgeCls}>
            <p className="text-[9px] text-[#5a6a8a] uppercase mb-0.5">
              Nhiệt độ
            </p>
            <p className="text-xs font-bold text-[#ff9abc]">
              {planet.temperature}
            </p>
          </div>
          <div className={badgeCls}>
            <p className="text-[9px] text-[#5a6a8a] uppercase mb-0.5">
              Mặt trăng
            </p>
            <p className="text-xs font-bold text-[#82c8ff]">
              {planet.numberOfMoons}
            </p>
          </div>
        </div>

        <div className="px-6 mb-4">
          <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-3.5 border border-[rgba(255,255,255,0.05)]">
            <p className="text-sm text-[#bcc8f0] leading-relaxed">
              {planet.description}
            </p>
          </div>
        </div>

        <div className="px-6 mb-3 flex gap-1 bg-[rgba(255,255,255,0.02)] rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 cursor-pointer rounded-lg py-2 text-xs font-semibold
                         transition-all duration-200 ${
                           tab === t.key
                             ? 'bg-[rgba(100,150,255,0.2)] text-[#aaccff]'
                             : 'text-[#5a6a8a] hover:text-[#8a9ac0]'
                         }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {tab === 'about' && (
          <div className="px-6 mb-4 grid grid-cols-2 gap-3">
            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-3 border border-[rgba(255,255,255,0.05)]">
              <p className="text-[10px] text-[#5a6a8a] uppercase mb-1">Loại</p>
              <p className="text-xs font-bold text-[#ffc864]">
                {planet.type === 'rocky' ? 'Đá 🪨' : planet.type === 'gas' ? 'Khí 💨' : 'Băng ❄️'}
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-3 border border-[rgba(255,255,255,0.05)]">
              <p className="text-[10px] text-[#5a6a8a] uppercase mb-1">Vành đai</p>
              <p className="text-xs font-bold text-[#ff9abc]">
                {planet.hasRing ? 'Có 💫' : 'Không ✖️'}
              </p>
            </div>
          </div>
        )}

        {tab === 'facts' && (
          <div className="px-6 mb-4 flex flex-col gap-2">
            {planet.funFacts.map((fact, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 bg-[rgba(255,200,100,0.04)]
                          rounded-2xl border border-[rgba(255,200,100,0.08)]"
              >
                <span className="text-lg mt-0.5 flex-shrink-0">
                  {i === 0 ? '🌟' : i === 1 ? '✨' : '💫'}
                </span>
                <p className="text-sm text-[#e0d0ff] leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'compare' && (
          <div className="px-6 mb-4">
            <div className="bg-[rgba(130,200,255,0.05)] rounded-2xl p-4 border border-[rgba(130,200,255,0.08)]">
              <p className="text-xs text-[#7a8aaa] uppercase tracking-wide mb-2">
                Kích thước so với Trái Đất
              </p>
              <p className="text-sm text-[#bcc8f0] leading-relaxed">
                {planet.sizeComparison}
              </p>
            </div>
          </div>
        )}

        <div className="px-6 pb-6 pt-2 flex gap-3">
          <button
            onClick={() => {
              setFocusPlanet(null)
              setStep('explore')
            }}
            className="flex-1 cursor-pointer rounded-full border border-[rgba(255,255,255,0.1)]
                       py-3 text-sm font-bold text-[#7a8aaa]
                       transition-all duration-300 hover:border-[rgba(255,255,255,0.3)] hover:text-white"
          >
            Quay Lại
          </button>
          <button
            onClick={() => setStep('quiz')}
            className="flex-1 cursor-pointer rounded-full py-3 text-sm font-bold
                       bg-gradient-to-r from-[#4d8fff] to-[#7c5cff]
                       text-white shadow-[0_0_20px_rgba(100,120,255,0.3)]
                       transition-all duration-300 hover:scale-105"
          >
            Trả Lời Câu Đố 🎯
          </button>
        </div>
      </div>
    </div>
  )
}