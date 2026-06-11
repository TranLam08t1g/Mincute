import { type SVGProps } from 'react'

export function PlanetIconSun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe066" />
          <stop offset="50%" stopColor="#ffb444" />
          <stop offset="100%" stopColor="#ff8822" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="10" fill="url(#sunGrad)" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="#ffd84d" strokeWidth="0.8" opacity="0.5" />
      <circle cx="16" cy="16" r="13" fill="none" stroke="#ffd84d" strokeWidth="0.4" opacity="0.2" />
    </svg>
  )
}

export function PlanetIconMercury(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="8" fill="#aabbcc" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <ellipse cx="14" cy="14" rx="2" ry="1.5" fill="#8899aa" opacity="0.4" />
      <ellipse cx="18" cy="18" rx="1.5" ry="1" fill="#7788aa" opacity="0.3" />
    </svg>
  )
}

export function PlanetIconVenus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="9" fill="#e8c876" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <path d="M8 12 Q16 10 24 12" stroke="#ccaa55" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M9 16 Q16 14 23 16" stroke="#ccaa55" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M10 20 Q16 18 22 20" stroke="#ccaa55" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  )
}

export function PlanetIconEarth(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="9" fill="#4daaee" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <path d="M10 8 Q8 16 10 24" stroke="#2a8844" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M16 7 Q20 16 16 25" stroke="#2a8844" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M22 8 Q24 16 22 24" stroke="#2a8844" strokeWidth="1" fill="none" opacity="0.4" />
      <circle cx="20" cy="12" r="2.5" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}

export function PlanetIconMars(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="8" fill="#dd5544" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <circle cx="19" cy="12" r="2" fill="rgba(255,255,255,0.1)" />
      <ellipse cx="14" cy="17" rx="3" ry="1.5" fill="rgba(0,0,0,0.1)" />
    </svg>
  )
}

export function PlanetIconJupiter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="10" fill="#ddaa66" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <path d="M6 13 Q16 12 26 13" stroke="#cc8844" strokeWidth="1.8" fill="none" opacity="0.55" />
      <path d="M6 16 Q16 15 26 16" stroke="#cc8844" strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M6 19 Q16 18 26 19" stroke="#cc8844" strokeWidth="1.5" fill="none" opacity="0.5" />
      <ellipse cx="16" cy="15" rx="4" ry="2.5" fill="rgba(255,150,80,0.25)" />
    </svg>
  )
}

export function PlanetIconSaturn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="16" cy="13" rx="14" ry="3.5" fill="none" stroke="#ddaa44" strokeWidth="2" opacity="0.55" />
      <circle cx="16" cy="16" r="8" fill="#ddaa44" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <ellipse cx="16" cy="13" rx="14" ry="3.5" fill="none" stroke="#ddaa44" strokeWidth="1.2" opacity="0.3" />
      <path d="M8 17 Q16 16 24 17" stroke="#cc9944" strokeWidth="1.2" fill="none" opacity="0.3" />
    </svg>
  )
}

export function PlanetIconUranus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="8" fill="#66cccc" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <ellipse cx="16" cy="14" rx="3" ry="2" fill="rgba(255,255,255,0.12)" />
      <path d="M8 19 Q16 21 24 19" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
    </svg>
  )
}

export function PlanetIconNeptune(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="9" fill="#4466dd" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <path d="M8 13 Q16 12 24 13" stroke="rgba(200,220,255,0.3)" strokeWidth="1" fill="none" />
      <path d="M8 17 Q16 20 24 17" stroke="rgba(200,220,255,0.2)" strokeWidth="1.5" fill="none" />
      <ellipse cx="18" cy="20" rx="2" ry="1.5" fill="rgba(255,255,255,0.1)" />
    </svg>
  )
}

const planetIconMap: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  sun: PlanetIconSun,
  mercury: PlanetIconMercury,
  venus: PlanetIconVenus,
  earth: PlanetIconEarth,
  mars: PlanetIconMars,
  jupiter: PlanetIconJupiter,
  saturn: PlanetIconSaturn,
  uranus: PlanetIconUranus,
  neptune: PlanetIconNeptune,
}

export function getPlanetIcon(id: string): React.FC<SVGProps<SVGSVGElement>> | null {
  return planetIconMap[id] ?? null
}