import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Float, Sphere, Stars, Trail, OrbitControls, Text, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const AtmosphereShaderMaterial = {
  uniforms: {
    viewVector: { value: new THREE.Vector3(0, 0, 1) },
    color: { value: new THREE.Color(0x60a5fa) },
    coef: { value: 0.8 },
    power: { value: 4.0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float coef;
    uniform float power;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(coef - dot(vNormal, vec3(0.0, 0.0, 1.0)), power);
      gl_FragColor = vec4(color, 1.0) * intensity * 1.5;
    }
  `,
  transparent: true,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
};

const Satellite = ({ color }) => {
  return (
    <group rotation={[0, Math.PI / 4, 0]} scale={0.6}>
       {/* Main Bus - Gold Foil / Thermal Insulation */}
       <mesh>
         <boxGeometry args={[0.3, 0.4, 0.3]} />
         <meshStandardMaterial 
            color="#d4af37" // Gold
            roughness={0.3}
            metalness={0.8}
            bumpScale={0.02}
         />
       </mesh>
       
       {/* Solar Arrays - Detailed */}
       {/* Left Wing */}
       <group position={[0.45, 0, 0]}>
            <mesh rotation={[0, 0, 0]}>
                <boxGeometry args={[0.6, 0.3, 0.02]} />
                <meshStandardMaterial 
                    color="#1e293b" // Dark blue-grey
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#0f172a"
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* Hinge */}
            <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                 <cylinderGeometry args={[0.02, 0.02, 0.1]} />
                 <meshStandardMaterial color="#94a3b8" />
            </mesh>
       </group>

       {/* Right Wing */}
       <group position={[-0.45, 0, 0]}>
            <mesh rotation={[0, 0, 0]}>
                <boxGeometry args={[0.6, 0.3, 0.02]} />
                <meshStandardMaterial 
                    color="#1e293b" 
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#0f172a"
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* Hinge */}
            <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                 <cylinderGeometry args={[0.02, 0.02, 0.1]} />
                 <meshStandardMaterial color="#94a3b8" />
            </mesh>
       </group>

       {/* Comms Dish */}
       <group position={[0, 0.25, 0]} rotation={[0.2, 0, 0]}>
            <mesh>
                <sphereGeometry args={[0.15, 32, 16, 0, Math.PI * 2, 0, 1]} />
                <meshStandardMaterial color="#f1f5f9" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
                 <cylinderGeometry args={[0.005, 0.005, 0.2]} />
                 <meshStandardMaterial color="#cbd5e1" />
            </mesh>
       </group>

       {/* Tech Indicator Light (Blinking) */}
        <mesh position={[0, 0, 0.16]}>
             <sphereGeometry args={[0.05, 16, 16]} />
             <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
         <pointLight color={color} intensity={1.5} distance={1} />
    </group>
  )
}

const TechIcon = ({ text, color, position, explode, onExplosionComplete }) => {
    const groupRef = useRef();
    const [hovered, setHover] = useState(false);
    
    useFrame((state, delta) => {
        if (groupRef.current) {
             // Slowly rotate the satellite itself
            groupRef.current.rotation.y += delta * 0.5;
            // Add a slight wobble
             groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });

    if (explode) {
        return (
            <group position={position}>
                 <SatelliteExplosion onComplete={onExplosionComplete} />
            </group>
        );
    }

    return (
        <group position={position}>
            <Float speed={4} rotationIntensity={1} floatIntensity={1}>
                <group 
                    ref={groupRef}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    scale={hovered ? 1.2 : 1}
                >
                    <Trail
                        width={1.5}
                        length={6}
                        color={new THREE.Color(color).multiplyScalar(2)} // Brighter trail
                        attenuation={(t) => t * t}
                    >
                        <Satellite color={color} />
                    </Trail>
                </group>
            </Float>
        </group>
    );
};

const StarWarp = ({ count = 2000 }) => {
    const mesh = useRef();
    const light = useRef();
    
    // Create random particles
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            // Update time
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);
            
            // Update position - Move towards camera (Z axis)
            // We want a warp effect, so particles should move fast in Z
            particle.zFactor += 0.1; // Move forward
            if (particle.zFactor > 50) particle.zFactor = -50; // Reset

            dummy.position.set(
                (particle.xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10),
                (particle.yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10),
                particle.zFactor
            );
            
            // Scale based on distance to create "passing by" effect
            const sScale = Math.max(0.1, (particle.zFactor + 50) / 100);
            dummy.scale.set(sScale, sScale, sScale);
            
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </instancedMesh>
    );
};

const EarthSystem = ({ explode, onExplosionComplete, focused }) => {
  const earthRef = useRef();
  const earthWireframeRef = useRef();
  const moonGroupRef = useRef();
  const moonRef = useRef();
  const techRingRef = useRef();

  // Load Earth Textures
  const [colorMap, normalMap, specularMap, cloudsMap, emissiveMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png'
  ]);
  
  // Load Moon Texture
  const [moonColorMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg'
  ]);

  useFrame((state, delta) => {
    // ... (Earth & Moon rotation - keep them moving)
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
    if (earthWireframeRef.current) {
        earthWireframeRef.current.rotation.y += delta * 0.07;
    }
    if (moonGroupRef.current) {
        moonGroupRef.current.rotation.y += delta * 0.1;
    }
    if (moonRef.current) {
        moonRef.current.rotation.y += delta * 0.02;
    }

    // Tech Ring Rotation - Pause if focused
    if (techRingRef.current && !focused) {
        techRingRef.current.rotation.z += delta * 0.05;
        techRingRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    } else if (techRingRef.current && focused) {
        // Optional: Slowly align the target satellite to view?
        // For now, just stopping is enough to "focus" on the impending doom.
        // Or dampen the rotation to zero.
        techRingRef.current.rotation.z = THREE.MathUtils.lerp(techRingRef.current.rotation.z, techRingRef.current.rotation.z, 0.1);
    }
  });

  return (
    <group scale={1.2}>
      {/* --- Earth --- */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <group>
            {/* Base Earth Sphere */}
            <Sphere ref={earthRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
                <meshPhongMaterial 
                    map={colorMap}
                    normalMap={normalMap}
                    normalScale={[2, 2]} // Enhanced normal effect
                    specularMap={specularMap}
                    shininess={15}
                    emissiveMap={emissiveMap}
                    emissive="#ffcc88"
                    emissiveIntensity={2}
                    specular="#22d3ee"
                />
            </Sphere>
            
            {/* Clouds / Atmosphere Layer */}
            <Sphere ref={earthWireframeRef} args={[1.52, 64, 64]} position={[0, 0, 0]}>
                <meshPhongMaterial 
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                    depthWrite={false} // Prevent z-fighting
                />
            </Sphere>

            {/* Atmosphere Glow (Custom Shader) */}
            <mesh scale={[1.65, 1.65, 1.65]}> 
                 <sphereGeometry args={[1, 64, 64]} />
                 <shaderMaterial args={[AtmosphereShaderMaterial]} side={THREE.BackSide} transparent depthWrite={false} />
            </mesh>
        </group>
      </Float>

      {/* --- Moon --- */}
      <group ref={moonGroupRef} rotation={[0.5, 0, 0]}>
         <group position={[3.5, 0, 0]}>
            <Sphere ref={moonRef} args={[0.4, 32, 32]}>
                <meshStandardMaterial map={moonColorMap} roughness={0.8} />
            </Sphere>
         </group>
      </group>

      {/* --- Tech Stack Orbit Ring --- */}
      <group ref={techRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <TechIcon 
            text="React" 
            color="#61dafb" 
            position={[2.5, 0, 0]} 
            explode={explode} 
            onExplosionComplete={onExplosionComplete} 
        />
        <TechIcon text="JS" color="#f7df1e" position={[-2.5, 0, 0]} />
        <TechIcon text="Node" color="#68a063" position={[0, 2.5, 0]} />
        <TechIcon text="Three" color="#ffffff" position={[0, -2.5, 0]} />
        
        {/* Ring Visual */}
        <mesh rotation={[Math.PI/2, 0, 0]}>
            <ringGeometry args={[2.4, 2.5, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>
      </group>

    </group>
  );
};

const SatelliteExplosion = ({ onComplete }) => {
  const debris = useMemo(() => {
    return Array.from({ length: 120 }, () => {
      const t = Math.random();
      const type = t < 0.4 ? 'box' : t < 0.8 ? 'tetra' : 'panel';
      const speed = 6 + Math.random() * 8;
      const dir = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5)
      ).normalize().multiplyScalar(speed);
      return {
        velocity: dir,
        angular: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(2),
        scale: 0.25 + Math.random() * 0.35,
        life: 1,
        color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
        metal: Math.random() > 0.7,
        type
      };
    });
  }, []);

  const group = useRef();
  const shockwaveRef = useRef();
  const glowRef = useRef();
  const flashRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const d = Math.min(delta, 0.033);

    if (group.current) {
      let idx = 0;
      for (const child of group.current.children) {
        if (child === shockwaveRef.current || child === glowRef.current || child === flashRef.current) continue;
        const p = debris[idx++];
        child.position.addScaledVector(p.velocity, d);
        child.rotation.x += p.angular.x * d;
        child.rotation.y += p.angular.y * d;
        child.rotation.z += p.angular.z * d;
        p.velocity.multiplyScalar(0.96);
        p.life -= d * 0.35;
        child.scale.setScalar(Math.max(0.001, p.scale * p.life));
        const mat = child.material;
        if (mat && mat.transparent) {
          mat.opacity = Math.max(0, p.life);
        }
      }
    }

    if (shockwaveRef.current) {
      const s = 1 + timeRef.current * 6;
      shockwaveRef.current.scale.set(s, s, s);
      const mat = shockwaveRef.current.material;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, d * 2);
    }

    if (glowRef.current) {
      const g = 1 + timeRef.current * 2;
      glowRef.current.scale.setScalar(g);
      const mat = glowRef.current.material;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, d * 1.5);
    }

    if (flashRef.current) {
      flashRef.current.intensity = Math.max(0, flashRef.current.intensity - d * 20);
    }
  });

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(flashRef.current, { intensity: 18, duration: 0.08, ease: 'power3.out' })
      .to(flashRef.current, { intensity: 0, duration: 0.6, ease: 'power3.in' }, '<');
    if (shockwaveRef.current) {
      shockwaveRef.current.material.opacity = 0.8;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.6;
    }
    const timeout = setTimeout(onComplete, 2400);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <group ref={group} position={[0, 0, 0]}>
      {debris.map((p, i) => (
        <mesh key={i}>
          {p.type === 'box' && <boxGeometry args={[0.18, 0.18, 0.18]} />}
          {p.type === 'tetra' && <tetrahedronGeometry args={[0.2, 0]} />}
          {p.type === 'panel' && <boxGeometry args={[0.36, 0.02, 0.24]} />}
          <meshStandardMaterial
            color={p.color}
            metalness={p.metal ? 0.8 : 0.2}
            roughness={p.metal ? 0.3 : 0.7}
            emissive={p.color}
            emissiveIntensity={0.4}
            transparent
          />
        </mesh>
      ))}
      <mesh ref={shockwaveRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.42, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.0} blending={THREE.AdditiveBlending} />
      </mesh>
      <Icosahedron ref={glowRef} args={[0.35, 0]}>
        <meshBasicMaterial color="#ffedd5" transparent opacity={0.0} blending={THREE.AdditiveBlending} />
      </Icosahedron>
      <pointLight ref={flashRef} intensity={0} distance={8} color="#ffd7a3" />
    </group>
  );
};

const CameraRig = ({ controlsRef, focused }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;
    if (focused) {
      gsap.to(camera.position, { x: 2.5, y: 0.6, z: 4, duration: 1, ease: 'power3.out' });
      gsap.to(controlsRef.current.target, {
        x: 2.5, y: 0, z: 0, duration: 1, ease: 'power3.out',
        onUpdate: () => controlsRef.current.update()
      });
    } else {
      gsap.to(camera.position, { x: 0, y: 0, z: 8, duration: 1, ease: 'power3.inOut' });
      gsap.to(controlsRef.current.target, {
        x: 0, y: 0, z: 0, duration: 1, ease: 'power3.inOut',
        onUpdate: () => controlsRef.current.update()
      });
    }
  }, [focused, camera, controlsRef]);

  return null;
};

const TechAnimation3D = () => {
  const containerRef = useRef(null);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [explode, setExplode] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
      const handleFocus = () => {
          setFocused(true);
          // Scroll to top/hero section smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      const handleDestruct = () => {
          setExplode(true);
          // Reset focus after explosion sequence
          setTimeout(() => setFocused(false), 2000);
      };

      window.addEventListener('satellite-focus', handleFocus);
      window.addEventListener('satellite-destruct', handleDestruct);
      
      return () => {
          window.removeEventListener('satellite-focus', handleFocus);
          window.removeEventListener('satellite-destruct', handleDestruct);
      };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
// ... existing wheel listener code ...
    const handleWheel = (e) => {
        if (zoomEnabled) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [zoomEnabled]);

  const controlsRef = useRef();
  return (
    <div 
        ref={containerRef}
        className="w-full h-full cursor-move"
        onMouseEnter={() => setZoomEnabled(true)}
        onMouseLeave={() => setZoomEnabled(false)}
    >
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
            <pointLight position={[-5, -3, -5]} intensity={1} color="#3b82f6" />
            <spotLight position={[5, 0, 5]} intensity={2} angle={0.5} penumbra={1} color="#a855f7" />

            <React.Suspense fallback={null}>
               <EarthSystem explode={explode} onExplosionComplete={() => setExplode(false)} focused={focused} />
            </React.Suspense>
            
            <CameraRig controlsRef={controlsRef} focused={focused} />
            
            <OrbitControls 
                ref={controlsRef}
                enableZoom={zoomEnabled} 
                minDistance={5}
                maxDistance={20}
                enablePan={false} 
                autoRotate={!zoomEnabled && !focused}
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI - Math.PI / 4}
            />
            
            {/* Moving Star Warp Effect */}
            <StarWarp count={1500} />
            {/* Background static stars for depth */}
            <Stars radius={150} depth={50} count={1000} factor={4} saturation={0} fade speed={0} />
        </Canvas>
    </div>
  );
};

export default TechAnimation3D;
