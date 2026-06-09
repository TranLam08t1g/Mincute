/* eslint-disable react-hooks/immutability */
import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { planetVertexShader, planetFragmentShader } from '../../shaders/planet'
import { DEFAULT_WHITE, getPlanetType, getPlanetParams } from '../../utils/planetHelpers'
import { useKidStore } from '../../store/kidStore'

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [hovered, setHovered] = useState(false)

  const activeTexture = texture ?? DEFAULT_WHITE
  const typeVal = getPlanetType('sun')
  const params = getPlanetParams('sun')
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const setStep = useKidStore((s) => s.setStep)

  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      setFocusPlanet(null)
      setStep('explore')
    },
    [setFocusPlanet, setStep],
  )

  const uniforms = useMemo(
    () => ({
      uTexture: { value: activeTexture },
      uPlanetColor: { value: new THREE.Color(0xff8c00) },
      uTime: { value: 0 },
      uEffectIntensity: { value: params.intensity },
      uAnimSpeed: { value: new THREE.Vector2(params.animX, params.animY) },
      uPlanetType: { value: typeVal },
    }),
    [activeTexture, typeVal, params],
  )

  useEffect(() => {
    const BASE = import.meta.env.BASE_URL || '/'
    const loader = new THREE.TextureLoader()
    loader.load(
      `${BASE}textures/2k_sun.jpg`,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        setTexture(tex)
      },
    )
  }, [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      uniforms.uTime.value += delta
      meshRef.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.5, 64, 64]} />
        <shaderMaterial
          vertexShader={planetVertexShader}
          fragmentShader={planetFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <Html
        position={[0, 2.2, 0]}
        center
        style={{ pointerEvents: 'auto' }}
        distanceFactor={18}
      >
        <button
          onClick={handleClick}
          className={`whitespace-nowrap rounded-full border px-4 py-2
                     font-bold text-[13px] tracking-wide uppercase
                     transition-all duration-300 cursor-pointer
                     ${hovered
                       ? 'border-[rgba(255,200,100,0.5)] bg-[rgba(255,140,40,0.15)] text-[#ffc864] scale-110'
                       : 'border-[rgba(255,200,100,0.2)] bg-[rgba(0,0,0,0.2)] text-[#ffb444]'
                     }`}
        >
          ☀️ MẶT TRỜI
        </button>
      </Html>
    </group>
  )
}