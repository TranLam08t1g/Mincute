import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useKidStore } from '../../store/kidStore'

interface CameraControllerProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>
}

export function CameraController({ controlsRef }: CameraControllerProps) {
  const { camera } = useThree()
  const step = useKidStore((s) => s.step)
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const transitionProgress = useRef(0)
  const heroStartPos = useRef(new THREE.Vector3(28, 15, 25))
  const wasTransitioning = useRef(false)

  useFrame((_, delta) => {
    if (step === 'hero') {
      const t = performance.now() * 0.001
      camera.position.set(
        28 * Math.sin(t * 0.06),
        12 + 3 * Math.sin(t * 0.03),
        28 * Math.cos(t * 0.06),
      )
      camera.lookAt(0, 0, 0)

      heroStartPos.current.copy(camera.position)

      if (controlsRef.current) {
        controlsRef.current.enabled = false
        controlsRef.current.target.set(0, 0, 0)
      }
      transitionProgress.current = 0
      wasTransitioning.current = false
      return
    }

    if (focusPlanet) {
      transitionProgress.current = 1
      wasTransitioning.current = false
    }

    if (transitionProgress.current < 1) {
      if (controlsRef.current) {
        controlsRef.current.enabled = false
      }
      wasTransitioning.current = true

      transitionProgress.current = Math.min(
        1,
        transitionProgress.current + delta * 0.8,
      )
      const explorePos = new THREE.Vector3(0, 8, 22)
      const eased =
        1 - Math.pow(1 - transitionProgress.current, 3)
      camera.position.lerpVectors(
        heroStartPos.current,
        explorePos,
        eased,
      )
      camera.lookAt(0, 0, 0)
    } else if (wasTransitioning.current) {
      if (controlsRef.current) {
        controlsRef.current.enabled = true
      }
      wasTransitioning.current = false
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={5}
      maxDistance={50}
    />
  )
}