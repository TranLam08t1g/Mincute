import { useKidStore } from '../../store/kidStore'

export function GuideCharacter() {
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const badges = useKidStore((s) => s.badges)
  const step = useKidStore((s) => s.step)

  const message = step === 'quiz'
    ? 'Chọn đáp án đúng nhất nhé Min Cute! 🌟'
    : focusPlanet
      ? 'Bấm vào hành tinh để khám phá nào! 🌟'
      : badges.length === 0
        ? 'Chào bạn! Hãy nhấn vào một hành tinh để bắt đầu! 🚀'
        : badges.length >= 8
          ? 'Wow! Bạn đã khám phá tất cả rồi! 🏆'
          : `Tuyệt vời! Còn ${8 - badges.length} hành tinh nữa nhé! ⭐`

  return (
    <div className="fixed left-6 bottom-40 z-10 pointer-events-none max-sm:left-2 max-sm:bottom-32">
      <div className="flex items-end gap-3">
        <div className="text-5xl animate-float">🧑‍🚀</div>
        <div className="bg-[rgba(20,24,50,0.9)] backdrop-blur-md rounded-2xl rounded-bl-none border border-[rgba(255,255,255,0.1)] px-4 py-3 max-w-[220px] animate-slide-up">
          <p className="text-sm text-[#d0d8ff] leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}