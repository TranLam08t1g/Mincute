import { type SVGProps } from 'react'

interface LogoProps extends SVGProps<SVGSVGElement> {
  showIcon?: boolean
  iconOnly?: boolean
}

export function Logo({ showIcon = true, iconOnly = false, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {showIcon && (
        <g transform="translate(0, 0)">
          <circle cx="24" cy="24" r="20" fill="#1a2456" stroke="#4d9de0" strokeWidth="1.5" opacity="0.6" />
          <circle cx="24" cy="20" r="12" fill="url(#helmetGrad)" stroke="#aaccff" strokeWidth="0.8" opacity="0.5" />
          <circle cx="24" cy="20" r="9" fill="#ffe8d0" opacity="0.8" />
          <path d="M17 16 Q24 11 31 16" fill="#3a2a1a" />
          <circle cx="20" cy="20" r="2" fill="#1a1a3e" />
          <circle cx="28" cy="20" r="2" fill="#1a1a3e" />
          <path d="M22 24 Q24 26 26 24" fill="none" stroke="#d4a080" strokeWidth="1" strokeLinecap="round" />
          <ellipse cx="18" cy="23" rx="2" ry="1" fill="#ff9999" opacity="0.3" />
          <ellipse cx="30" cy="23" rx="2" ry="1" fill="#ff9999" opacity="0.3" />
        </g>
      )}

      {!iconOnly && (
        <g transform="translate(showIcon ? 56 : 0, 0)">
          <defs>
            <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd84d" />
              <stop offset="100%" stopColor="#7ed6ff" />
            </linearGradient>
            <linearGradient id="subGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7ed6ff" />
              <stop offset="100%" stopColor="#ff9abc" />
            </linearGradient>
          </defs>
          <text x="0" y="22"
                fontFamily="Quicksand, sans-serif"
                fontWeight="700"
                fontSize="22"
                fill="url(#titleGrad)">
            MIN CUTE
          </text>
          <text x="0" y="38"
                fontFamily="Quicksand, sans-serif"
                fontWeight="600"
                fontSize="10"
                fill="url(#subGrad)"
                letterSpacing="2.5">
            NHÀ THÁM HIỂM NHÍ
          </text>
        </g>
      )}

      <defs>
        <radialGradient id="helmetGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#7ed6ff" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#4d9de0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1a3a6e" stopOpacity="0.2" />
        </radialGradient>
      </defs>
    </svg>
  )
}