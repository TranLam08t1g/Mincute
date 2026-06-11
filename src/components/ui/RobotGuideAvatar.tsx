import { type SVGProps } from 'react'

type Mood = 'idle' | 'wave' | 'happy' | 'think' | 'celebrate'

const moodEyes: Record<Mood, React.ReactNode> = {
  idle: (
    <>
      <rect x="18" y="22" width="10" height="7" rx="2" fill="#7ed6ff">
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="36" y="22" width="10" height="7" rx="2" fill="#7ed6ff">
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </rect>
    </>
  ),
  wave: (
    <>
      <rect x="18" y="22" width="10" height="7" rx="2" fill="#7ed6ff" opacity="0.9" />
      <rect x="36" y="22" width="10" height="7" rx="2" fill="#7ed6ff" opacity="0.9" />
    </>
  ),
  happy: (
    <>
      <rect x="18" y="20" width="10" height="5" rx="2" fill="#7cffa4" />
      <rect x="36" y="20" width="10" height="5" rx="2" fill="#7cffa4" />
      <path d="M23 18 Q23 14 20 17" fill="none" stroke="#7cffa4" strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
      </path>
    </>
  ),
  think: (
    <>
      <rect x="18" y="22" width="10" height="7" rx="2" fill="#ffd84d" opacity="0.8" />
      <rect x="36" y="22" width="10" height="7" rx="2" fill="#ffd84d" opacity="0.4" />
      <circle cx="53" cy="10" r="3" fill="#ffd84d" opacity="0.5">
        <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </>
  ),
  celebrate: (
    <>
      <rect x="18" y="18" width="10" height="5" rx="2" fill="#7cffa4">
        <animate attributeName="y" values="18;16;18" dur="0.5s" repeatCount="indefinite" />
      </rect>
      <rect x="36" y="18" width="10" height="5" rx="2" fill="#7cffa4">
        <animate attributeName="y" values="18;16;18" dur="0.5s" repeatCount="indefinite" />
      </rect>
    </>
  ),
}

const moodMouth: Record<Mood, React.ReactNode> = {
  idle: <rect x="23" y="33" width="18" height="3" rx="1.5" fill="#7ed6ff" opacity="0.6" />,
  wave: <rect x="25" y="33" width="14" height="3" rx="1.5" fill="#7ed6ff" opacity="0.7" />,
  happy: (
    <path d="M24 33 Q32 39 40 33" fill="none" stroke="#7cffa4" strokeWidth="2.5" strokeLinecap="round">
      <animate attributeName="d" values="M24 33 Q32 39 40 33;M24 32 Q32 40 40 32;M24 33 Q32 39 40 33" dur="2s" repeatCount="indefinite" />
    </path>
  ),
  think: (
    <>
      <rect x="25" y="33" width="6" height="3" rx="1.5" fill="#ffd84d" opacity="0.7" />
      <rect x="33" y="33" width="6" height="3" rx="1.5" fill="#ffd84d" opacity="0.4" />
    </>
  ),
  celebrate: (
    <path d="M24 34 Q32 42 40 34" fill="none" stroke="#7cffa4" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
  ),
}

const moodAntenna: Record<Mood, React.ReactNode> = {
  idle: <circle cx="32" cy="8" r="3" fill="#ff7b42" opacity="0.7">
    <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" repeatCount="indefinite" />
  </circle>,
  wave: <circle cx="32" cy="8" r="3" fill="#7ed6ff" opacity="0.8" />,
  happy: <circle cx="32" cy="8" r="3.5" fill="#7cffa4" opacity="0.9">
    <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite" />
  </circle>,
  think: (
    <circle cx="32" cy="8" r="3" fill="#ffd84d" opacity="0.8">
      <animate attributeName="cx" values="32;35;29;32" dur="2s" repeatCount="indefinite" />
    </circle>
  ),
  celebrate: (
    <circle cx="32" cy="8" r="3.5" fill="#ff7b42" opacity="0.9">
      <animate attributeName="r" values="3.5;5;3.5" dur="0.4s" repeatCount="indefinite" />
    </circle>
  ),
}

const moodArms: Record<Mood, React.ReactNode> = {
  idle: null,
  wave: (
    <path d="M52 40 L68 28" stroke="#8899cc" strokeWidth="5" strokeLinecap="round" opacity="0.8">
      <animate attributeName="d" values="M52 40 L68 28;M52 38 L64 30;M52 40 L68 28" dur="0.8s" repeatCount="indefinite" />
    </path>
  ),
  happy: null,
  think: (
    <ellipse cx="14" cy="42" rx="4" ry="3" fill="none" stroke="#8899cc" strokeWidth="4" opacity="0.5">
      <animate attributeName="ry" values="3;2;3" dur="1.5s" repeatCount="indefinite" />
    </ellipse>
  ),
  celebrate: (
    <>
      <path d="M12 34 L4 18" stroke="#8899cc" strokeWidth="5" strokeLinecap="round" opacity="0.8">
        <animate attributeName="d" values="M12 34 L4 18;M12 34 L8 22;M12 34 L4 18" dur="0.5s" repeatCount="indefinite" />
      </path>
      <path d="M52 34 L60 18" stroke="#8899cc" strokeWidth="5" strokeLinecap="round" opacity="0.8">
        <animate attributeName="d" values="M52 34 L60 18;M52 34 L56 22;M52 34 L60 18" dur="0.5s" repeatCount="indefinite" />
      </path>
    </>
  ),
}

interface RobotGuideAvatarProps extends SVGProps<SVGSVGElement> {
  mood?: Mood
}

export function RobotGuideAvatar({ mood = 'idle', ...props }: RobotGuideAvatarProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8d8f0" />
          <stop offset="100%" stopColor="#8899cc" />
        </linearGradient>
        <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8e8ff" />
          <stop offset="100%" stopColor="#aabbdd" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hover ring */}
      <ellipse cx="32" cy="58" rx="16" ry="4" fill="#7ed6ff" opacity="0.08">
        <animate attributeName="opacity" values="0.08;0.15;0.08" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="32" cy="58" rx="12" ry="3" fill="#7ed6ff" opacity="0.05" />

      {/* Antenna line */}
      <line x1="32" y1="17" x2="32" y2="10" stroke="#8899cc" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {moodAntenna[mood]}

      {/* Legs */}
      <rect x="18" y="52" width="8" height="8" rx="4" fill="url(#bodyGrad)" opacity="0.8" />
      <rect x="38" y="52" width="8" height="8" rx="4" fill="url(#bodyGrad)" opacity="0.8" />
      <rect x="20" y="56" width="4" height="3" rx="1.5" fill="#7ed6ff" opacity="0.4" />
      <rect x="40" y="56" width="4" height="3" rx="1.5" fill="#7ed6ff" opacity="0.4" />

      {/* Body */}
      <rect x="14" y="38" width="36" height="18" rx="9" fill="url(#bodyGrad)" opacity="0.9" />
      <rect x="14" y="38" width="36" height="18" rx="9" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Chest button + detail */}
      <rect x="24" y="43" width="16" height="8" rx="4" fill="#1a2456" opacity="0.15" />
      <circle cx="32" cy="47" r="2.5" fill="#7ed6ff" opacity="0.8" filter="url(#glow)">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="32" cy="47" r="1.2" fill="#ff7b42" opacity="0.9" />

      {/* Arms */}
      <rect x="4" y="40" width="10" height="6" rx="3" fill="url(#bodyGrad)" opacity="0.7" />
      <rect x="50" y="40" width="10" height="6" rx="3" fill="url(#bodyGrad)" opacity="0.7" />
      {moodArms[mood]}
      <circle cx="9" cy="43" r="3" fill="#7ed6ff" opacity="0.3" />
      <circle cx="55" cy="43" r="3" fill="#7ed6ff" opacity="0.3" />

      {/* Head */}
      <rect x="12" y="13" width="40" height="28" rx="14" fill="url(#headGrad)" opacity="0.95" />
      <rect x="12" y="13" width="40" height="28" rx="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

      {/* Ears / side panels */}
      <rect x="8" y="22" width="6" height="10" rx="3" fill="#8899cc" opacity="0.5" />
      <rect x="50" y="22" width="6" height="10" rx="3" fill="#8899cc" opacity="0.5" />

      {/* Eyes */}
      {moodEyes[mood]}

      {/* Mouth */}
      {moodMouth[mood]}

      {/* Neck joints */}
      <circle cx="22" cy="38" r="2.5" fill="#7ed6ff" opacity="0.3" />
      <circle cx="42" cy="38" r="2.5" fill="#7ed6ff" opacity="0.3" />
    </svg>
  )
}