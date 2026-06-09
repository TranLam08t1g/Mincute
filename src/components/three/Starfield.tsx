/* eslint-disable react-hooks/immutability, react-hooks/purity */
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 4000

const COLOR_PALETTES: [number, number, number][] = [
  [1.0, 0.95, 0.78],
  [0.65, 0.78, 1.0],
  [1.0, 0.84, 0.55],
  [0.72, 0.68, 0.95],
  [1.0, 0.65, 0.55],
  [0.8, 0.9, 1.0],
  [1.0, 0.92, 0.7],
]

const starVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vPhase;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
    vPhase = aPhase;
  }
`

const starFragmentShader = `
  varying vec3 vColor;
  varying float vPhase;
  uniform float uTime;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float alpha = 1.0 - smoothstep(0.0, 1.0, d);
    alpha = pow(alpha, 1.6);
    float twinkle = 0.5 + 0.5 * sin(uTime * 1.6 + vPhase * 35.0);
    alpha *= twinkle;
    if (alpha < 0.025) discard;
    gl_FragColor = vec4(vColor * 1.25, alpha);
  }
`

function createStarGeometry() {
  const positions = new Float32Array(STAR_COUNT * 3)
  const sizes = new Float32Array(STAR_COUNT)
  const phases = new Float32Array(STAR_COUNT)
  const colors = new Float32Array(STAR_COUNT * 3)

  for (let i = 0; i < STAR_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60
    sizes[i] = 0.015 + Math.random() * 0.14
    phases[i] = Math.random() * Math.PI * 2

    const palette =
      COLOR_PALETTES[
        Math.floor(Math.random() * COLOR_PALETTES.length)
      ]
    colors[i * 3] = palette[0]
    colors[i * 3 + 1] = palette[1]
    colors[i * 3 + 2] = palette[2]
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3),
  )
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  return geo
}

function ShootingStar() {
  const lineRef = useRef<THREE.Line>(null)
  const speed = useRef(12 + Math.random() * 18)
  const resetPos = useRef(() => {
    if (!lineRef.current) return
    lineRef.current.position.set(
      -25 + Math.random() * 15,
      8 + Math.random() * 18,
      -15 + Math.random() * 10,
    )
    speed.current = 12 + Math.random() * 18
  })

  useFrame((_, delta) => {
    if (!lineRef.current) return
    lineRef.current.position.x += delta * speed.current
    lineRef.current.position.y -= delta * speed.current * 0.55
    lineRef.current.position.z += delta * speed.current * 0.15

    if (
      lineRef.current.position.x > 35 ||
      lineRef.current.position.y < -20
    ) {
      resetPos.current()
    }
  })

  const geo = useMemo(() => {
    const trail = 1.2
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-trail * 0.6, trail * 0.25, 0),
      new THREE.Vector3(-trail, trail * 0.45, 0),
    ])
  }, [])

  const mat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.55,
        depthTest: true,
        depthWrite: false,
      }),
    [],
  )

  return (
    <group>
      <lineSegments ref={lineRef} geometry={geo} material={mat} />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshBasicMaterial color={0xffffff} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

export function Starfield() {
  const pointsRef = useRef<THREE.Points>(null)

  const { geo, shaderMat } = useMemo(() => {
    const geometry = createStarGeometry()
    const material = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    return { geo: geometry, shaderMat: material }
  }, [])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012
      shaderMat.uniforms.uTime.value += delta
    }
  })

  return (
    <group>
      <points ref={pointsRef} geometry={geo} material={shaderMat} />
      <ShootingStar />
      <ShootingStar />
      <ShootingStar />
    </group>
  )
}