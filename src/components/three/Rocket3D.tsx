import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Rocket3D() {
  const groupRef = useRef<THREE.Group>(null)
  const flameGroupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const t = performance.now() * 0.001
    groupRef.current.position.x = 15 * Math.cos(t * 0.18)
    groupRef.current.position.z = 15 * Math.sin(t * 0.18)
    groupRef.current.position.y = 5 + Math.sin(t * 0.25) * 2

    groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.25
    groupRef.current.rotation.x = Math.cos(t * 0.18) * 0.15
    groupRef.current.rotation.y += delta * 0.15

    if (flameGroupRef.current) {
      flameGroupRef.current.scale.y =
        0.7 + Math.sin(t * 12) * 0.3 + (Math.random() - 0.5) * 0.15
      flameGroupRef.current.scale.x =
        0.85 + Math.cos(t * 10) * 0.15
      flameGroupRef.current.scale.z =
        0.85 + Math.sin(t * 9) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Nose cone */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.45, 0.75, 16]} />
        <meshStandardMaterial
          color="#ff3b3b"
          metalness={0.15}
          roughness={0.25}
        />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 1.8, 16]} />
        <meshStandardMaterial
          color="#e8ecf0"
          metalness={0.35}
          roughness={0.3}
        />
      </mesh>

      {/* Colored stripe */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.12, 16]} />
        <meshStandardMaterial
          color="#2255cc"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.12, 16]} />
        <meshStandardMaterial
          color="#ff6633"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Window */}
      <mesh position={[0, 0.45, 0.42]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color="#44ccff"
          emissive="#2299dd"
          emissiveIntensity={0.4}
          roughness={0.15}
        />
      </mesh>

      {/* Fins */}
      {[0, 120, 240].map((angle) => (
        <mesh
          key={angle}
          position={[0, -0.85, 0]}
          rotation={[0, (angle * Math.PI) / 180, 0.35]}
        >
          <boxGeometry args={[0.06, 0.45, 0.32]} />
          <meshStandardMaterial
            color="#ff5533"
            metalness={0.2}
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Engine nozzle */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 0.2, 16]} />
        <meshStandardMaterial
          color="#444444"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Flame */}
      <group ref={flameGroupRef} position={[0, -1.4, 0]}>
        <mesh>
          <coneGeometry args={[0.22, 0.6, 8]} />
          <meshBasicMaterial color="#ff7700" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <coneGeometry args={[0.13, 0.4, 8]} />
          <meshBasicMaterial color="#ffcc00" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <coneGeometry args={[0.06, 0.25, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Particle trail glow */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={`p-${i}`}
          position={[0, -1.5 - i * 0.22, 0]}
        >
          <sphereGeometry args={[0.07 - i * 0.012, 4, 4]} />
          <meshBasicMaterial
            color={i < 2 ? '#ff8800' : '#ffaa00'}
            transparent
            opacity={0.35 - i * 0.06}
          />
        </mesh>
      ))}
    </group>
  )
}