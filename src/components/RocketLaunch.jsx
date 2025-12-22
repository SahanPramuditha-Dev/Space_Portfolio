import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stage } from '@react-three/drei';

const Rocket = (props) => {
  const group = useRef();
  
  // Basic low-poly rocket using primitives
  return (
    <group ref={group} {...props} dispose={null}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      
      {/* Nose Cone */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Fins */}
      {[0, 90, 180, 270].map((angle, i) => (
        <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
          <mesh position={[0.6, -0.8, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.5, 0.8, 0.1]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </group>
      ))}
      
      {/* Window */}
      <mesh position={[0, 0.5, 0.45]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Engine Flame (Animated in a real scenario, static for now) */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.3, 0.5, 16]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

const RocketLaunch = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Float
          speed={2} // Animation speed
          rotationIntensity={1} // XYZ rotation intensity
          floatIntensity={2} // Up/down float intensity
        >
          <Rocket rotation={[0.2, 0.5, 0]} scale={1.2} />
        </Float>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};

export default RocketLaunch;
