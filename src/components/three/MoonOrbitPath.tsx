import { useMemo } from 'react'
import * as THREE from 'three'

interface MoonOrbitPathProps {
  radius: number
  color?: number
}

export function MoonOrbitPath({ radius, color = 0x6688ff }: MoonOrbitPathProps) {
  const line = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    const mat = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.12,
      gapSize: 0.2,
      transparent: true,
      opacity: 0.25,
      depthTest: true,
      depthWrite: false,
    })
    const l = new THREE.Line(geo, mat)
    l.computeLineDistances()
    return l
  }, [radius, color])

  return <primitive object={line} />
}