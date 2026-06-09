import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { KID_PLANETS } from '../../data/planets-kids'

const BASE = import.meta.env.BASE_URL || '/'

export function QuizPlanet3D({ planetId }: { planetId: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let disposed = false

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 10)
    camera.position.set(0, 0.1, 4.2)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

    const ambient = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambient)

    const sun = new THREE.DirectionalLight(0xffffff, 1.6)
    sun.position.set(5, 3, 5)
    scene.add(sun)

    const fill = new THREE.DirectionalLight(0x6e88cc, 0.55)
    fill.position.set(-3, -2, -4)
    scene.add(fill)

    const sphereGroup = new THREE.Group()
    sphereGroup.rotation.set(0.15, 0.2, 0)
    scene.add(sphereGroup)

    const geometry = new THREE.SphereGeometry(1.3, 52, 52)
    const material = new THREE.MeshStandardMaterial({
      color: '#8899aa',
      roughness: 0.82,
      metalness: 0.06,
    })
    const mesh = new THREE.Mesh(geometry, material)
    sphereGroup.add(mesh)

    const planet = KID_PLANETS.find((p) => p.id === planetId)
    const hasRing = !!planet?.hasRing

    let ringMaterial: THREE.MeshBasicMaterial | null = null

    if (hasRing) {
      const ringGeo = new THREE.RingGeometry(1.55, 2.45, 64)
      ringMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        color: '#d4c098',
      })
      const ring = new THREE.Mesh(ringGeo, ringMaterial)
      ring.rotation.set(Math.PI * 0.5, 0, 0.3)
      sphereGroup.add(ring)

      const ringLoader = new THREE.TextureLoader()
      ringLoader.load(`${BASE}textures/2k_saturn_ring_alpha.png`, (tex) => {
        if (disposed) return
        tex.colorSpace = THREE.SRGBColorSpace
        if (ringMaterial) {
          ringMaterial.map = tex
          ringMaterial.color.set('#ffffff')
          ringMaterial.needsUpdate = true
        }
      })
    }

    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(`${BASE}textures/2k_${planetId}.jpg`, (tex) => {
      if (disposed) return
      tex.colorSpace = THREE.SRGBColorSpace
      material.map = tex
      material.color.set('#ffffff')
      material.needsUpdate = true
    })

    const clock = new THREE.Clock()

    function animate() {
      if (disposed) return
      requestAnimationFrame(animate)
      const dt = Math.min(clock.getDelta(), 0.1)
      sphereGroup.rotation.y += dt * 0.45
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      disposed = true
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (ringMaterial) ringMaterial.dispose()
    }
  }, [planetId])

  return (
    <div ref={containerRef} className="w-28 h-28 mx-auto">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}