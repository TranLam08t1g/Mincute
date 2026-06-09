import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'
import { getMoonsForPlanet } from '../../data/moons'
import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitPath } from './OrbitPath'
import { Moon } from './Moon'
import { Starfield } from './Starfield'
import { CameraController } from './CameraController'
import { FocusCamera } from './FocusCamera'
import { Rocket3D } from './Rocket3D'

const ORBIT_COLORS: Record<string, number> = {
  mercury: 0xff9944,
  venus: 0xffdd44,
  earth: 0x44aaff,
  mars: 0xff6655,
  jupiter: 0xddaa66,
  saturn: 0xddaa44,
  uranus: 0x55cccc,
  neptune: 0x4466dd,
}

export function SolarSystem() {
  const groupRef = useRef<THREE.Group>(null)
  const planetGroupRefs = useRef<Record<string, THREE.Group | null>>({})
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const step = useKidStore((s) => s.step)
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const camTarget = useRef(new THREE.Vector3(0, 0, 0))

  const registerRef = (id: string) => (el: THREE.Group | null) => {
    planetGroupRefs.current[id] = el
  }

  useFrame(() => {
    if (!groupRef.current) return
    if (step === 'hero') return
    if (focusPlanet) return

    camTarget.current.lerp(new THREE.Vector3(0, 0, 0), 0.04)

    if (controlsRef.current) {
      controlsRef.current.target.copy(camTarget.current)
    }
  })

  return (
    <group ref={groupRef}>
      <CameraController controlsRef={controlsRef} />
      <FocusCamera controlsRef={controlsRef} planetGroupRefs={planetGroupRefs} />
      {step === 'hero' && <Rocket3D />}
      <Starfield />
      <Sun />
      {KID_PLANETS.map((p) => {
        const moons = getMoonsForPlanet(p.id)
        const orbitColor = ORBIT_COLORS[p.id] ?? 0x335588
        return (
          <group key={p.id}>
            <OrbitPath radius={p.orbit} color={orbitColor} />
            <Planet
              data={p}
              registerRef={registerRef(p.id)}
              moonOrbitRadii={moons.map((m) => m.orbitRadius)}
            >
              {moons.map((m) => (
                <Moon key={m.id} data={m} />
              ))}
            </Planet>
          </group>
        )
      })}
    </group>
  )
}