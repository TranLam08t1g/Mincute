import { useState, useEffect } from 'react'
import { useKidStore } from '../../store/kidStore'

export function KidHero() {
  const step = useKidStore((s) => s.step)
  const setStep = useKidStore((s) => s.setStep)
  const [exiting, setExiting] = useState(false)
  const [mounted, setMounted] = useState(true)

  const handleStart = () => {
    setExiting(true)
    setStep('explore')
  }

  useEffect(() => {
    if (step !== 'hero' && exiting) {
      const timer = setTimeout(() => setMounted(false), 600)
      return () => clearTimeout(timer)
    }
  }, [step, exiting])

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-4
                  bg-gradient-to-br from-[#0a0a2e]/70 via-[#1a1040]/55 to-[#0d1b3e]/70
                  backdrop-blur-[2px]
                  ${exiting ? 'animate-hero-fade-out' : 'animate-hero-fade-in'}`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[8%] left-[5%] text-5xl animate-float opacity-50"
              style={{ animationDelay: '0s' }}>⭐</span>
        <span className="absolute top-[12%] right-[8%] text-4xl animate-float opacity-45"
              style={{ animationDelay: '0.7s' }}>✨</span>
        <span className="absolute top-[30%] left-[12%] text-3xl animate-float opacity-35"
              style={{ animationDelay: '1.4s' }}>💫</span>
        <span className="absolute bottom-[25%] left-[8%] text-5xl animate-float opacity-40"
              style={{ animationDelay: '2.0s' }}>🪐</span>
        <span className="absolute bottom-[18%] right-[6%] text-4xl animate-float opacity-45"
              style={{ animationDelay: '1.2s' }}>🌙</span>
        <span className="absolute top-[45%] right-[14%] text-3xl animate-float opacity-35"
              style={{ animationDelay: '2.5s' }}>🌍</span>
      </div>

<div className="relative z-10">
          <div className="text-7xl mb-6 drop-shadow-[0_0_30px_rgba(255,200,50,0.3)]">
            🚀
          </div>

          <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] rounded-full px-5 py-2 border border-[rgba(255,255,255,0.1)] mb-6">
            <span className="text-2xl">🧑‍🚀</span>
            <span className="text-sm text-[#bcc4e0] font-semibold">
              Phi hành gia Min Cute
            </span>
          </div>

          <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-5 tracking-tight leading-none">
            <span className="text-[#ffd84d] drop-shadow-[0_0_25px_rgba(255,216,77,0.5)]">
              Khám Phá
            </span>
            <br />
            <span className="text-[#7ed6ff] drop-shadow-[0_0_25px_rgba(126,214,255,0.5)]">
              Vũ Trụ
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#c0ccf0] mb-3 font-medium">
            Chào mừng phi hành gia{' '}
            <span className="text-[#ffd84d] font-bold drop-shadow-[0_0_12px_rgba(255,216,77,0.4)]">
              Min Cute
            </span>
            ! 🌌
          </p>

          <p className="text-base md:text-lg text-[#8899bc] mb-12 max-w-md mx-auto leading-relaxed">
            Hành trình kỳ thú qua 8 hành tinh trong hệ Mặt Trời. Nhấp vào
            từng hành tinh, giải câu đố vui và sưu tầm huy hiệu nào!
          </p>

        <button
          onClick={handleStart}
          className="cursor-pointer rounded-full px-12 py-5 text-xl font-bold
                     bg-gradient-to-r from-[#ff7b42] via-[#ff5e7a] to-[#ff4d7a]
                     text-white shadow-[0_0_40px_rgba(255,100,80,0.45)]
                     transition-all duration-300 hover:scale-110
                     hover:shadow-[0_0_60px_rgba(255,100,80,0.6)]
                     active:scale-95"
        >
          BẮT ĐẦU HÀNH TRÌNH 🚀
        </button>

        <div className="mt-14 flex gap-4 text-3xl opacity-30">
          <span className="animate-twinkle" style={{ animationDelay: '0s' }}>⭐</span>
          <span className="animate-twinkle" style={{ animationDelay: '0.5s' }}>🌍</span>
          <span className="animate-twinkle" style={{ animationDelay: '1s' }}>🪐</span>
          <span className="animate-twinkle" style={{ animationDelay: '1.5s' }}>💫</span>
          <span className="animate-twinkle" style={{ animationDelay: '2s' }}>🌙</span>
        </div>
      </div>
    </div>
  )
}