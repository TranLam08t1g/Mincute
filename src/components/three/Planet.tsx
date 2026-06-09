/* eslint-disable react-hooks/immutability */
import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import type { PlanetData } from '../../data/planets'
import { planetVertexShader, planetFragmentShader } from '../../shaders/planet'
import { MoonOrbitPath } from './MoonOrbitPath'
import { DEFAULT_WHITE, getPlanetType, getPlanetParams } from '../../utils/planetHelpers'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'

interface PlanetProps {
  data: PlanetData
  moonOrbitRadii?: number[]
  children?: React.ReactNode
  registerRef?: (el: THREE.Group | null) => void
}

const LABEL_COLORS: Record<string, { border: string; bg: string; text: string }> = {
  mercury: { border: 'rgba(255,153,68,0.35)', bg: 'rgba(255,153,68,0.12)', text: '#ffb066' },
  venus: { border: 'rgba(255,221,68,0.35)', bg: 'rgba(255,221,68,0.12)', text: '#ffdd77' },
  earth: { border: 'rgba(68,170,255,0.35)', bg: 'rgba(68,170,255,0.12)', text: '#6dbcff' },
  mars: { border: 'rgba(255,102,85,0.35)', bg: 'rgba(255,102,85,0.12)', text: '#ff8877' },
  jupiter: { border: 'rgba(221,170,102,0.35)', bg: 'rgba(221,170,102,0.12)', text: '#eebb77' },
  saturn: { border: 'rgba(221,170,68,0.35)', bg: 'rgba(221,170,68,0.12)', text: '#eebb55' },
  uranus: { border: 'rgba(85,204,204,0.35)', bg: 'rgba(85,204,204,0.12)', text: '#77dddd' },
  neptune: { border: 'rgba(68,102,221,0.35)', bg: 'rgba(68,102,221,0.12)', text: '#6688ee' },
}

export function Planet({ data, moonOrbitRadii, children, registerRef }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(data.startAngle)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [hovered, setHovered] = useState(false)

  const activeTexture = texture ?? DEFAULT_WHITE
  const typeVal = getPlanetType(data.id)
  const params = getPlanetParams(data.id)
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const setStep = useKidStore((s) => s.setStep)

  const kidPlanet = KID_PLANETS.find((p) => p.id === data.id)
  const labelColors = LABEL_COLORS[data.id] ?? LABEL_COLORS.mercury

  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      if (focusPlanet === data.id) return
      setFocusPlanet(data.id)
      setStep('story')
    },
    [focusPlanet, data.id, setFocusPlanet, setStep],
  )

  const uniforms = useMemo(
    () => ({
      uTexture: { value: activeTexture },
      uPlanetColor: { value: new THREE.Color(data.hexColor) },
      uTime: { value: 0 },
      uEffectIntensity: { value: params.intensity },
      uAnimSpeed: { value: new THREE.Vector2(params.animX, params.animY) },
      uPlanetType: { value: typeVal },
    }),
    [activeTexture, data.hexColor, typeVal, params],
  )

  useEffect(() => {
    const BASE = import.meta.env.BASE_URL || '/'
    const loader = new THREE.TextureLoader()
    loader.load(`${BASE}textures/2k_${data.id}.jpg`, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setTexture(tex)
    })
  }, [data.id])

  useEffect(() => {
    registerRef?.(groupRef.current)
    return () => registerRef?.(null)
  }, [registerRef])

  useFrame((_, delta) => {
    angleRef.current += data.speed * delta
    if (groupRef.current) {
      groupRef.current.position.x =
        Math.cos(angleRef.current) * data.orbit
      groupRef.current.position.z =
        Math.sin(angleRef.current) * data.orbit
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * data.speed * 1.5
    }
    uniforms.uTime.value += delta

    if (meshRef.current) {
      const targetScale = hovered || focusPlanet === data.id ? 1.15 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1,
      )
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[data.radius, 64, 64]} />
        <shaderMaterial
          vertexShader={planetVertexShader}
          fragmentShader={planetFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      {data.hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI * 0.5, 0, 0.3]}>
          <ringGeometry args={[data.radius * 1.3, data.radius * 2.2, 64]} />
          <meshBasicMaterial
            color={0xead6b8}
            side={THREE.DoubleSide}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
      )}
      <Html
        position={[0, data.radius * 1.7, 0]}
        center
        style={{ pointerEvents: 'auto' }}
        distanceFactor={18}
      >
        <button
          onClick={handleClick}
          style={{
            borderColor: focusPlanet === data.id
              ? labelColors.border.replace('0.35', '0.7')
              : labelColors.border,
            backgroundColor: focusPlanet === data.id
              ? labelColors.bg.replace('0.12', '0.22')
              : labelColors.bg,
            color: focusPlanet === data.id ? '#ffd84d' : labelColors.text,
            boxShadow: focusPlanet === data.id
              ? '0 0 18px rgba(255,180,60,0.35)'
              : 'none',
          }}
          className="whitespace-nowrap rounded-full border px-4 py-2
                     font-bold text-[13px] tracking-wide uppercase
                     transition-all duration-300 cursor-pointer
                     hover:scale-110"
        >
          {kidPlanet?.emoji ?? '⭐'} {data.name.toUpperCase()}
        </button>
      </Html>
      {moonOrbitRadii?.map((r, i) => (
        <MoonOrbitPath key={i} radius={r} />
      ))}
      {children}
    </group>
  )
}