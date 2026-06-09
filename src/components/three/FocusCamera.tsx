import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useKidStore } from '../../store/kidStore'
import { KID_PLANETS } from '../../data/planets-kids'

interface FocusCameraProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>
  planetGroupRefs: React.RefObject<Record<string, THREE.Group | null>>
}

export function FocusCamera({
  controlsRef,
  planetGroupRefs,
}: FocusCameraProps) {
  const { camera } = useThree()
  const focusPlanet = useKidStore((s) => s.focusPlanet)
  const prevFocus = useRef<string | null>(null)
  const retryId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const ctrl = controlsRef.current
    return () => {
      gsap.killTweensOf(camera.position)
      if (ctrl) {
        gsap.killTweensOf(ctrl.target)
        gsap.killTweensOf(ctrl)
      }
      if (retryId.current) clearTimeout(retryId.current)
    }
  }, [camera, controlsRef])

  useEffect(() => {
    const ctrl = controlsRef.current
    const prev = prevFocus.current
    prevFocus.current = focusPlanet

    if (!focusPlanet) {
      if (!prev || !ctrl) return

      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(ctrl.target)
      gsap.killTweensOf(ctrl)

      ctrl.enabled = false

      gsap.to(ctrl.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.0,
        ease: 'power2.out',
      })

      gsap.to(camera.position, {
        x: 0,
        y: 8,
        z: 22,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          if (controlsRef.current) {
            controlsRef.current.enabled = true
            gsap.to(controlsRef.current, {
              minDistance: 5,
              duration: 0.3,
              ease: 'power2.out',
            })
          }
        },
      })

      return
    }

    const tryAnimate = () => {
      const targetGroup = planetGroupRefs.current[focusPlanet]
      if (!ctrl || !targetGroup) {
        retryId.current = setTimeout(tryAnimate, 100)
        return
      }

      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(ctrl.target)
      gsap.killTweensOf(ctrl)

      const worldPos = new THREE.Vector3()
      targetGroup.getWorldPosition(worldPos)

      const planet = KID_PLANETS.find((p) => p.id === focusPlanet)
      const r = planet?.radius ?? 0.5
      const distance = r * 5 + 2
      const targetCamPos = new THREE.Vector3(
        worldPos.x + distance * 0.45,
        worldPos.y + distance * 0.35,
        worldPos.z + distance * 0.75,
      )

      ctrl.enabled = false

      gsap.to(ctrl.target, {
        x: worldPos.x,
        y: worldPos.y,
        z: worldPos.z,
        duration: 1.2,
        ease: 'power3.out',
      })

      gsap.to(camera.position, {
        x: targetCamPos.x,
        y: targetCamPos.y,
        z: targetCamPos.z,
        duration: 1.5,
        ease: 'power3.inOut',
        onComplete: () => {
          if (controlsRef.current) {
            controlsRef.current.enabled = true
            gsap.to(controlsRef.current, {
              minDistance: r * 1.5,
              duration: 0.4,
              ease: 'power2.out',
            })
          }
        },
      })
    }

    if (retryId.current) clearTimeout(retryId.current)
    tryAnimate()
  }, [focusPlanet, camera, controlsRef, planetGroupRefs])

  return null
}