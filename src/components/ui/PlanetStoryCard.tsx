import { useState } from 'react'
import { motion } from 'motion/react'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getPlanetIcon } from '../../data/planet-icons'

type TabKey = 'about' | 'facts' | 'compare'

export function PlanetStoryCard() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const setStep = useKidStore((s) => s.setStep)
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const [tab, setTab] = useState<TabKey>('about')

  const planet = KID_PLANETS.find((p) => p.id === focusPlanet)
  if (!planet) return null

  const PlanetIcon = getPlanetIcon(planet.id)

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'about', label: 'Thông tin', icon: '📖' },
    { key: 'facts', label: 'Sự thật thú vị', icon: '💡' },
    { key: 'compare', label: 'So sánh', icon: '📏' },
  ]

  const badgeCls = 'bg-[rgba(255,255,255,0.04)] rounded-xl p-2.5 text-center border border-[rgba(255,255,255,0.05)]'

  const handleBackdrop = () => {
    setFocusPlanet(null)
    setStep('explore')
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-label={`Thông tin về ${planet.name}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleBackdrop() }}
    >
      <motion.div
        className="bg-[rgba(14,18,40,0.85)] backdrop-blur-xl
                    rounded-t-3xl border-t border-x border-[rgba(255,255,255,0.1)]
                    shadow-[0_-10px_60px_rgba(0,0,0,0.4)]
                    max-h-[85vh] overflow-y-auto"
        initial={{ y: '60%' }}
        animate={{ y: 0 }}
        exit={{ y: '60%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mx-auto mt-3 mb-4 w-10 h-1 rounded-full opacity-50"
          style={{ backgroundColor: planet.color }}
        />

        <div className="px-6 pb-3 flex items-center gap-3">
          {PlanetIcon && <PlanetIcon width={40} height={40} aria-hidden="true" />}
          <div>
            <h2 className="text-xl font-bold text-white">{planet.name}</h2>
            <p className="text-xs text-[#7a8aaa]">{planet.nickname}</p>
          </div>
          <button
            onClick={handleBackdrop}
            className="ml-auto cursor-pointer w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)]
                       flex items-center justify-center text-[#7a8aaa]
                       hover:bg-[rgba(255,255,255,0.12)] hover:text-white
                       transition-all duration-200 text-sm active:scale-[0.92]"
            aria-label="Đóng thông tin"
          >
            ✕
          </button>
        </div>

        <div className="px-6 mb-4 grid grid-cols-4 gap-2">
          <div className={badgeCls}>
            <p className="text-[9px] text-[#5a6a8a] uppercase mb-0.5">Khoảng cách</p>
            <p className="text-xs font-bold text-[#ffc864]">{planet.distanceFromSun}</p>
          </div>
          <div className={badgeCls}>
            <p className="text-[9px] text-[#5a6a8a] uppercase mb-0.5">Chu kỳ</p>
            <p className="text-xs font-bold text-[#64b4ff]">{planet.orbitalPeriod}</p>
          </div>
          <div className={badgeCls}>
            <p className="text-[9px] text-[#5a6a8a] uppercase mb-0.5">Nhiệt độ</p>
            <p className="text-xs font-bold text-[#ff9abc]">{planet.temperature}</p>
          </div>
          <div className={badgeCls}>
            <p className="text-[9px] text-[#5a6a8a] uppercase mb-0.5">Mặt trăng</p>
            <p className="text-xs font-bold text-[#82c8ff]">{planet.numberOfMoons}</p>
          </div>
        </div>

        <div className="px-6 mb-4">
          <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-3.5 border border-[rgba(255,255,255,0.05)]">
            <p className="text-sm text-[#bcc8f0] leading-relaxed">{planet.description}</p>
          </div>
        </div>

        <div className="px-6 mb-3 flex gap-1 bg-[rgba(255,255,255,0.02)] rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="relative flex-1 cursor-pointer rounded-lg py-2 text-xs font-semibold
                         transition-all duration-200 active:scale-[0.95]"
              aria-selected={tab === t.key}
              role="tab"
            >
              {tab === t.key && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-[rgba(100,150,255,0.2)]"
                  layoutId="storyTab"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative ${
                  tab === t.key ? 'text-[#aaccff]' : 'text-[#5a6a8a]'
                }`}
              >
                {t.icon} {t.label}
              </span>
            </button>
          ))}
        </div>

        {tab === 'about' && (
          <motion.div
            className="px-6 mb-4 grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-3 border border-[rgba(255,255,255,0.05)]">
              <p className="text-[10px] text-[#5a6a8a] uppercase mb-1">Loại</p>
              <p className="text-xs font-bold text-[#ffc864]">
                {planet.type === 'rocky' ? 'Hành tinh đá' : planet.type === 'gas' ? 'Hành tinh khí khổng lồ' : 'Hành tinh băng'}
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-3 border border-[rgba(255,255,255,0.05)]">
              <p className="text-[10px] text-[#5a6a8a] uppercase mb-1">Vành đai</p>
              <p className="text-xs font-bold text-[#ff9abc]">
                {planet.hasRing ? 'Có vành đai' : 'Không có'}
              </p>
            </div>
          </motion.div>
        )}

        {tab === 'facts' && (
          <motion.div
            className="px-6 mb-4 flex flex-col gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {planet.funFacts.map((fact, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 bg-[rgba(255,200,100,0.04)]
                          rounded-2xl border border-[rgba(255,200,100,0.08)]"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full
                               bg-[rgba(255,200,100,0.15)] text-[#ffc864] text-xs font-bold mt-0.5 flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-[#e0d0ff] leading-relaxed">{fact}</p>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'compare' && (
          <motion.div
            className="px-6 mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[rgba(130,200,255,0.05)] rounded-2xl p-4 border border-[rgba(130,200,255,0.08)]">
              <p className="text-xs text-[#7a8aaa] uppercase tracking-wide mb-2">
                Kích thước so với Trái Đất
              </p>
              <p className="text-sm text-[#bcc8f0] leading-relaxed">{planet.sizeComparison}</p>
            </div>
          </motion.div>
        )}

        <div className="px-6 pb-6 pt-2 flex gap-3">
          <button
            onClick={handleBackdrop}
            className="flex-1 cursor-pointer rounded-full border border-[rgba(255,255,255,0.1)]
                       py-3 text-sm font-bold text-[#7a8aaa]
                       transition-all duration-200 hover:border-[rgba(255,255,255,0.3)] hover:text-white
                       active:scale-[0.96]"
            aria-label="Quay lại khám phá"
          >
            Quay Lại
          </button>
          <button
            onClick={() => setStep('quiz')}
            className="flex-1 cursor-pointer rounded-full py-3 text-sm font-bold
                       bg-gradient-to-r from-[#4d8fff] to-[#7c5cff]
                       text-white shadow-[0_0_20px_rgba(100,120,255,0.3)]
                       transition-all duration-200 hover:scale-105 active:scale-[0.96]"
            aria-label="Bắt đầu làm câu đố về hành tinh này"
          >
            Làm Câu Đố 🎯
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}