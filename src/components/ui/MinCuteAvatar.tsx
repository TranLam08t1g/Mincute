import { type SVGProps } from 'react'

type Mood = 'wave' | 'happy' | 'celebrate' | 'think'

const moodEyes: Record<Mood, React.ReactNode> = {
  wave: (
    <>
      <circle cx="29" cy="26" r="2.5" fill="#1a1a3e" />
      <circle cx="43" cy="26" r="2.5" fill="#1a1a3e" />
    </>
  ),
  happy: (
    <>
      <path d="M26 26 Q29 22 32 26" fill="none" stroke="#1a1a3e" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 26 Q43 22 46 26" fill="none" stroke="#1a1a3e" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  celebrate: (
    <>
      <circle cx="29" cy="24" r="2.5" fill="#1a1a3e" />
      <circle cx="43" cy="24" r="2.5" fill="#1a1a3e" />
      <path d="M26 30 Q36 36 46 30" fill="none" stroke="#1a1a3e" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  think: (
    <>
      <circle cx="29" cy="26" r="2.5" fill="#1a1a3e" />
      <circle cx="43" cy="26" r="2.5" fill="#1a1a3e" />
      <circle cx="29" cy="18" r="1.5" fill="#1a1a3e" opacity="0.4" />
    </>
  ),
}

const moodArms: Record<Mood, React.ReactNode> = {
  wave: (
    <g>
      <path d="M52 48 L62 32 Q64 28 60 26" stroke="#ffd84d" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="26" r="4.5" fill="#ffd84d" opacity="0.9" />
    </g>
  ),
  happy: (
    <path d="M52 44 L58 36 Q60 32 56 30 L52 30" stroke="#ffd84d" strokeWidth="4" strokeLinecap="round" fill="none" />
  ),
  celebrate: (
    <>
      <path d="M52 44 L64 28 Q66 24 62 22" stroke="#ffd84d" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M20 44 L8 28 Q6 24 10 22" stroke="#ffd84d" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  ),
  think: (
    <path d="M52 44 L58 40 L52 40" stroke="#ffd84d" strokeWidth="4" strokeLinecap="round" fill="none" />
  ),
}

interface MinCuteAvatarProps extends SVGProps<SVGSVGElement> {
  mood?: Mood
  size?: number
}

export function MinCuteAvatar({ mood = 'wave', size = 72, ...props }: MinCuteAvatarProps) {
  const baseSize = 72
  const scale = size / baseSize

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ transform: `scale(${scale})`, transformOrigin: 'top left', ...props.style }}
    >
      <defs>
        <radialGradient id="visorGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#7ed6ff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#4d9de0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1a3a6e" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="suitGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#f8f8ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#d0d8f0" stopOpacity="1" />
        </radialGradient>
      </defs>

      <circle cx="36" cy="36" r="33" fill="#1a2456" />
      <circle cx="36" cy="36" r="33" fill="none" stroke="#4d9de0" strokeWidth="1.5" opacity="0.5" />

      {/* Helmet */}
      <circle cx="36" cy="28" r="16" fill="url(#visorGrad)" stroke="#aaccff" strokeWidth="1" opacity="0.6" />

      {/* Face inside helmet */}
      <circle cx="36" cy="28" r="12" fill="#ffe8d0" opacity="0.75" />

      {/* Hair/Bangs */}
      <path d="M26 22 Q30 16 36 18 Q42 16 46 22"
            fill="#3a2a1a" stroke="none" />

      {moodEyes[mood]}

      {/* Nose */}
      <ellipse cx="36" cy="30" rx="1.5" ry="1" fill="#d4a080" />

      {/* Mouth */}
      <path d="M33 33 Q36 36 39 33" fill="none" stroke="#d4a080" strokeWidth="1.2" strokeLinecap="round" />

      {/* Cheek blush */}
      <ellipse cx="28" cy="30" rx="2.5" ry="1.5" fill="#ff9999" opacity="0.35" />
      <ellipse cx="44" cy="30" rx="2.5" ry="1.5" fill="#ff9999" opacity="0.35" />

      {/* Suit body */}
      <rect x="24" y="42" width="24" height="18" rx="8" fill="url(#suitGrad)" stroke="#aaccff" strokeWidth="0.8" opacity="0.85" />

      {/* Belt */}
      <rect x="24" y="50" width="24" height="4" rx="2" fill="#4d9de0" opacity="0.5" />
      <rect x="34" y="49" width="4" height="6" rx="1.5" fill="#ffd84d" />

      {/* Arms */}
      <path d="M24 44 L16 56" stroke="url(#suitGrad)" strokeWidth="6" strokeLinecap="round" />
      <path d="M48 44 L56 56" stroke="url(#suitGrad)" strokeWidth="6" strokeLinecap="round" />

      {moodArms[mood]}

      {/* Jetpack */}
      <rect x="46" y="46" width="6" height="10" rx="3" fill="#4d9de0" opacity="0.4" />
      <circle cx="49" cy="48" r="1.2" fill="#7ed6ff" opacity="0.5" />
      <circle cx="49" cy="53" r="1.2" fill="#7ed6ff" opacity="0.5" />
    </svg>
  )
}