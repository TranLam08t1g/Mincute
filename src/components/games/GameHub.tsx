import { motion } from 'motion/react'
import { useKidStore, type GameId } from '../../store/kidStore'
import { RobotGuideAvatar } from '../ui/RobotGuideAvatar'

interface GameCard {
  id: GameId
  name: string
  desc: string
  icon: string
  color: string
}

const games: GameCard[] = [
  { id: 'order', name: 'Xếp Đội Hình', desc: 'Sắp xếp hành tinh đúng thứ tự từ Mặt Trời', icon: '🪐', color: '#ffd84d' },
  { id: 'guess', name: 'Đố Vui Bí Ẩn', desc: 'Đoán hành tinh qua 3 gợi ý của Gia Khiêm', icon: '🤔', color: '#4d9de0' },
  { id: 'compare', name: 'So Găng Vũ Trụ', desc: 'So sánh 2 hành tinh — ai to hơn, nóng hơn?', icon: '⚖️', color: '#ff7b42' },
  { id: 'speed', name: 'Đua Tốc Độ', desc: 'Trả lời quiz nhanh nhất có thể, đánh bại đồng hồ!', icon: '⚡', color: '#7cffa4' },
  { id: 'moon', name: 'Vệ Tinh Bí Ẩn', desc: 'Khám phá mặt trăng của các hành tinh', icon: '🌙', color: '#7c5cff' },
]

export function GameHub() {
  const setCurrentGame = useKidStore((s) => s.setCurrentGame)
  const totalStars = useKidStore((s) => s.totalStars)
  const badges = useKidStore((s) => s.badges)
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const setStep = useKidStore((s) => s.setStep)

  const handleSelect = (id: GameId) => {
    setCurrentGame(id)
  }

  const handleBack = () => {
    setFocusPlanet(null)
    setStep('explore')
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto p-4"
      style={{ background: 'radial-gradient(ellipse at center, rgba(20,28,60,0.95) 0%, rgba(8,13,31,0.98) 100%)' }}
      onClick={handleBack}
    >
      <button
        onClick={handleBack}
        className="absolute top-6 right-6 z-10 cursor-pointer w-10 h-10 rounded-full
                   bg-[rgba(255,255,255,0.06)] flex items-center justify-center
                   text-[#7a8aaa] hover:bg-[rgba(255,255,255,0.12)] hover:text-white
                   transition-all duration-200 active:scale-90"
        aria-label="Quay lại khám phá"
      >
        ✕
      </button>

      <motion.div
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-3 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <RobotGuideAvatar mood="happy" width={64} height={64} />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-1">Trò Chơi Vũ Trụ</h2>
        <p className="text-sm text-[#7a8aaa]">Chọn một trò chơi để bắt đầu nha Min!</p>
      </motion.div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#ffd84d] text-lg">⭐</span>
        <span className="text-xl font-bold text-[#ffd84d]">{totalStars}</span>
        <span className="text-xs text-[#5a6a8a] ml-1">sao</span>

        <span className="mx-3 text-[#2a3a5a]">|</span>

        <span className="text-[#7ed6ff] text-lg">🏆</span>
        <span className="text-xl font-bold text-[#7ed6ff]">{badges.length}/8</span>
        <span className="text-xs text-[#5a6a8a] ml-1">huy hiệu</span>
      </div>

      <div className="grid grid-cols-1 gap-3 max-w-sm w-full">
        {games.map((game, i) => (
          <motion.button
            key={game.id}
            onClick={() => handleSelect(game.id)}
            className="cursor-pointer flex items-center gap-4 bg-[rgba(255,255,255,0.03)]
                       rounded-2xl p-4 border border-[rgba(255,255,255,0.06)]
                       text-left group hover:bg-[rgba(255,255,255,0.06)]
                       transition-all duration-200 active:scale-[0.98]"
            style={{ borderColor: `rgba(255,255,255,0.06)` }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
            whileHover={{
              borderColor: `${game.color}40`,
              boxShadow: `0 0 20px ${game.color}15`,
            }}
          >
            <span
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: `${game.color}15` }}
            >
              {game.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white mb-0.5">{game.name}</p>
              <p className="text-xs text-[#6a7a9a] leading-snug">{game.desc}</p>
            </div>
            <span className="text-[#2a3a5a] text-lg group-hover:text-[#5a6a8a] transition-colors">→</span>
          </motion.button>
        ))}
      </div>

      <motion.p
        className="mt-6 text-[10px] text-[#3a4a6a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Càng chơi nhiều càng nhiều ⭐ — lưu trên máy của bạn
      </motion.p>
    </div>
  )
}