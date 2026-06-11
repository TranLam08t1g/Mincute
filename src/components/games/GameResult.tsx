import { motion } from 'motion/react'
import { useKidStore, type GameId } from '../../store/kidStore'
import { RobotGuideAvatar } from '../ui/RobotGuideAvatar'

interface GameResultProps {
  gameId: GameId
  gameName: string
  score: number
  maxScore: number
  stars: number
  onReplay: () => void
}

export function GameResult({ gameId, gameName, score, maxScore, stars, onReplay }: GameResultProps) {
  const setCurrentGame = useKidStore((s) => s.setCurrentGame)
  const highScore = useKidStore((s) => s.highScores[gameId] ?? 0)
  const isNewHighScore = score > highScore && score > 0

  const starEmoji = ['', '⭐', '⭐⭐', '⭐⭐⭐']

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto p-4 bg-[rgba(0,0,0,0.35)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="dialog"
      aria-label={`Kết quả ${gameName}`}
    >
      <motion.div
        className="bg-[rgba(15,18,42,0.97)] backdrop-blur-xl rounded-3xl border border-[rgba(255,255,255,0.1)]
                   shadow-[0_0_80px_rgba(80,120,255,0.08)] max-w-xs w-full p-8 text-center"
        initial={{ scale: 0.7, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="mb-4 flex items-center justify-center"
          initial={{ rotate: -20 }}
          animate={{ rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <RobotGuideAvatar mood={stars >= 3 ? 'celebrate' : stars >= 2 ? 'happy' : 'wave'} width={56} height={56} />
        </motion.div>

        <motion.p
          className="text-lg font-bold text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {gameName}
        </motion.p>

        <motion.p
          className="text-4xl mb-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10, delay: 0.3 }}
        >
          {starEmoji[stars] ?? '⭐'}
        </motion.p>

        <motion.p
          className="text-sm text-[#7a8aaa] mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Điểm: {score}/{maxScore}
        </motion.p>

        {isNewHighScore && (
          <motion.p
            className="text-xs font-bold text-[#ffd84d] mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            🏆 Kỷ lục mới!
          </motion.p>
        )}

        {!isNewHighScore && highScore > 0 && (
          <motion.p
            className="text-xs text-[#5a6a8a] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Kỷ lục: {highScore} điểm
          </motion.p>
        )}

        <motion.div
          className="text-xs text-[#8899bb] bg-[rgba(255,255,255,0.03)] rounded-xl px-4 py-2 mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Gia Khiêm: "{stars >= 3 ? 'Min giỏi quá! Xuất sắc!' : stars >= 2 ? 'Tốt lắm Min! Cố lên nữa nha!' : 'Lần sau cố gắng hơn nha Min!'}"
        </motion.div>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentGame(null)}
            className="flex-1 cursor-pointer rounded-full border border-[rgba(255,255,255,0.1)]
                       py-3 text-sm font-bold text-[#7a8aaa] hover:text-white hover:border-[rgba(255,255,255,0.3)]
                       active:scale-[0.96] transition-all duration-200"
          >
            Thoát
          </button>
          <button
            onClick={onReplay}
            className="flex-1 cursor-pointer rounded-full py-3 text-sm font-bold
                       bg-gradient-to-r from-[#4d8fff] to-[#7c5cff]
                       text-white shadow-[0_0_20px_rgba(100,120,255,0.3)]
                       active:scale-[0.96] transition-all duration-200 hover:scale-105"
          >
            Chơi Lại 🔄
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}