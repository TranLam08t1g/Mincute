import { useMemo } from 'react'
import * as THREE from 'three'

interface OrbitPathProps {
  radius: number
  color?: number
}

export function OrbitPath({ radius, color = 0x335588 }: OrbitPathProps) {
  const line = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const segments = 120
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2
      pts.push(
        new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius),
      )
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.2,
      depthTest: true,
      depthWrite: false,
    })
    return new THREE.Line(geo, mat)
  }, [radius, color])

  return <primitive object={line} />
}