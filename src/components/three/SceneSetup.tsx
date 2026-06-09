import { Canvas } from '@react-three/fiber'
import { useKidStore } from '../../store/kidStore'
import { SolarSystem } from './SolarSystem'

export function SceneSetup() {
  const setFocusPlanet = useKidStore((s) => s.setFocusPlanet)
  const setStep = useKidStore((s) => s.setStep)

  return (
    <Canvas
      camera={{ position: [0, 8, 22], fov: 45, near: 0.1, far: 1000 }}
      gl={{ antialias: true, toneMapping: 3, toneMappingExposure: 1.1 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}
      onPointerMissed={() => {
        if (useKidStore.getState().step === 'hero') return
        setFocusPlanet(null)
        setStep('explore')
      }}
    >
      <ambientLight intensity={0.6} color="#2a2a50" />
      <pointLight position={[0, 0, 0]} intensity={2.5} distance={60} color="#FFAA44" />
      <SolarSystem />
    </Canvas>
  )
}