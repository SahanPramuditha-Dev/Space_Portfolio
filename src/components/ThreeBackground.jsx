import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Icosahedron } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FloatingShapes = () => {
  const { theme } = useTheme();
  const color = theme === 'dark' ? "#38bdf8" : "#0284c7";
  
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 2 // Keep z close to 0 but varied
      ],
      scale: Math.random() * 0.05 + 0.02,
      speed: Math.random() * 2 + 1,
    }));
  }, []);

  return (
    <group>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={2} floatIntensity={2} position={shape.position}>
          <Icosahedron args={[1, 0]} scale={shape.scale}>
            <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
          </Icosahedron>
        </Float>
      ))}
    </group>
  );
};

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    return random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 });
  });
  
  const { theme } = useTheme();
  const { mouse } = useThree();

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;

    // Interactive mouse movement
    const x = (mouse.x * 0.2 - ref.current.rotation.y) * 0.1;
    const y = (mouse.y * 0.2 - ref.current.rotation.x) * 0.1;
    
    ref.current.rotation.x += y;
    ref.current.rotation.y += x;
  });

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.rotation, {
        y: Math.PI * 2,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        ease: "none"
      });
    }
  }, []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={theme === 'dark' ? "#38bdf8" : "#0284c7"}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={theme === 'dark' ? 1 : 0.8}
        />
      </Points>
    </group>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
