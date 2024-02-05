import * as THREE from 'three'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Panorama } from '@/types/Panorama'

interface canvasAreaProps {
  panorama: Panorama
}

export function CanvasArea({ panorama }: canvasAreaProps) {
  const panoramaTexture = useLoader(THREE.TextureLoader, panorama.image_link)

  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.2}
        autoRotate={false}
        rotateSpeed={-0.5}
      />
      <group>
        <mesh scale={new THREE.Vector3(-1, 1, 1)}>
          <sphereGeometry
            args={[100, 50, 60, 0, Math.PI * 2, Math.PI * 0.3, Math.PI * 0.4]}
          />
          <meshBasicMaterial map={panoramaTexture} side={THREE.BackSide} />
        </mesh>
      </group>
    </Canvas>
  )
}
