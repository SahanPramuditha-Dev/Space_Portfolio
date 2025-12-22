import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Environment, Html } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

const SatelliteGlobe = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });
  return (
    <group>
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.8} />
        </mesh>
        {/* Scanning ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.62, 32]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
    </group>
  );
};

const Screen = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [screenState, setScreenState] = useState('initial'); // initial, hacking, dashboard
  const [lines, setLines] = useState([
    "> SYSTEM READY...",
    "> SECURE CONNECTION ESTABLISHED",
    "> AWAITING COMMAND",
    "",
    "> PRESS [ENTER] TO INITIATE SEQUENCE"
  ]);
  
  // Satellite telemetry state
  const [telemetry, setTelemetry] = useState({ lat: 34.0522, lon: -118.2437, alt: 405.2, lock: 0 });
  
  // Breach Sequence State
  const [breachStep, setBreachStep] = useState(0); // 0: Selection, 1: Auth, 2: Takeover, 3: Sequence, 4: Success
  const [inputVal, setInputVal] = useState("");
  const [breachLogs, setBreachLogs] = useState([]);
  const [bypassProgress, setBypassProgress] = useState(0);

  useFrame((state) => {
    // Blinking cursor
    if (Math.floor(state.clock.elapsedTime * 2) % 2 === 0) {
      setCursorVisible(true);
    } else {
      setCursorVisible(false);
    }

    // Update telemetry if in dashboard mode
    if (screenState === 'dashboard') {
        setTelemetry(prev => ({
            lat: prev.lat + 0.001,
            lon: prev.lon - 0.001,
            alt: 405 + Math.sin(state.clock.elapsedTime) * 0.5,
            lock: Math.min(prev.lock + 0.5, 100)
        }));
    }
  });

  // Breach Sequence Animation
  useEffect(() => {
    if (screenState === 'breach' && breachStep === 2) {
        // Takeover Sequence
        const runTakeover = async () => {
            await new Promise(r => setTimeout(r, 2000));
            setBreachStep(3); // Go to Hacking Sequence
        };
        runTakeover();
    }

    if (screenState === 'breach' && breachStep === 3) {
        // Hacking Sequence
        const runSequence = async () => {
            const delay = (ms) => new Promise(r => setTimeout(r, ms));
            const addLog = (msg) => setBreachLogs(prev => [...prev.slice(-8), msg]);

            addLog("[INFO] Establishing shadow uplink...");
            await delay(400);
            addLog("[OK] Signal lock achieved");
            await delay(300);
            addLog("[WARN] Redundant control loop detected");
            await delay(400);
            addLog("[ACTION] Rerouting command authority");
            await delay(500);
            
            // Bypass Progress
            for(let i=0; i<=100; i+=5) {
                setBypassProgress(i);
                await delay(50);
            }
            
            await delay(500);
            addLog("REQUESTING ADMINISTRATION OVERRIDE...");
            await delay(800);
            addLog("OVERRIDE GRANTED (WINDOW: 00:01:12)");
            await delay(400);
            addLog("ROOT CONTROL ASSIGNED");
            await delay(400);
            setBreachStep(4); // Success
        };
        runSequence();
    }

    if (screenState === 'breach' && breachStep === 5) {
        // Execution Sequence
        const runExecution = async () => {
            const delay = (ms) => new Promise(r => setTimeout(r, ms));
            const addLog = (msg) => setBreachLogs(prev => [...prev.slice(-8), msg]);

            addLog("COMMAND AUTHENTICATED");
            await delay(500);
            addLog("ARMING PAYLOAD...");
            await delay(800);
            addLog("TARGET LOCK CONFIRMED");
            await delay(500);
            addLog("FIRING ORBITAL BEAM...");
            
            // Flash effect or just text changes
            await delay(2000);
            
            // Reset to initial
            setScreenState('initial');
            setBreachStep(0);
            setLines(["> SYSTEM REBOOT...", "> MEMORY FLUSHED", "> READY"]);
        };
        runExecution();
    }

    if (screenState === 'breach' && breachStep === 6) {
        // Self Destruct Sequence
        const runDestruct = async () => {
            const delay = (ms) => new Promise(r => setTimeout(r, ms));
            
            // Countdown
            for(let i=5; i>0; i--) {
                setBreachLogs([`SELF DESTRUCT IN: ${i}`]);
                await delay(1000);
            }
            
            setBreachLogs(["ACQUIRING VISUAL..."]);
            // Trigger Navigation / Focus
            window.dispatchEvent(new Event('satellite-focus'));
            
            // Wait for navigation
            await delay(1500);

            // Trigger Satellite Explosion
            window.dispatchEvent(new Event('satellite-destruct'));
            
            setBreachLogs(["*** SIGNAL LOST ***"]);
            await delay(2000);
            
            // Reset
            setScreenState('initial');
            setBreachStep(0);
            setLines(["> NO CARRIER", "> SEARCHING FOR SIGNAL...", "> SYSTEM READY"]);
        };
        runDestruct();
    }
  }, [screenState, breachStep]);

  useEffect(() => {
    const handleKeyDown = async (e) => {
      // Prevent triggering if typing in a form
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;

      if (screenState === 'initial' && e.key === 'Enter') {
            setScreenState('hacking');
            setLines(["> INITIALIZING ROOTKIT..."]);
            
            const delay = (ms) => new Promise(r => setTimeout(r, ms));
            const addLine = (line) => setLines(prev => [...prev.slice(-12), line]);

            await delay(500);
            addLine("> TARGET: ORBITAL_SAT_7");
            await delay(400);
            addLine("> BYPASSING FIREWALL [Proxy: 192.168.0.1]...");
            
            for(let i=0; i<15; i++) {
                await delay(50);
                addLine(`> 0x${Math.random().toString(16).substr(2, 8).toUpperCase()} // INJECTING PACKET`);
            }

            await delay(600);
            addLine("> ROOT ACCESS: GRANTED");
            await delay(400);
            addLine("> UPLINKING TO SATELLITE...");
            
            let progress = "";
            for(let i=0; i<20; i++) {
                await delay(50);
                progress += "█";
                setLines(prev => [...prev.slice(0, -1), `> UPLINKING [${progress.padEnd(20, ' ')}] ${(i+1)*5}%`]);
            }

            await delay(500);
            addLine("> HANDSHAKE COMPLETE...");
            await delay(800);
            addLine("");
            addLine("> CONNECTION ESTABLISHED.");
            addLine("> PRESS [ENTER] FOR TELEMETRY");
      } 
      else if (screenState === 'hacking' && e.key === 'Enter' && lines[lines.length - 1].includes("PRESS [ENTER]")) {
             setScreenState('dashboard');
      }
      else if (screenState === 'dashboard' && e.key === 'Enter') {
             setScreenState('breach');
             setBreachStep(0); // Start at selection
      }
      else if (screenState === 'breach') {
          if (breachStep === 0) {
              if (e.key === '3') {
                  setBreachStep(1); // Go to Auth
                  setInputVal("");
              }
          } else if (breachStep === 1) {
              if (e.key === 'Enter') {
                  if (inputVal === '1234') {
                      setBreachStep(2); // Takeover
                  } else {
                      setInputVal(""); // Reset on wrong password
                  }
              } else if (e.key === 'Backspace') {
                  setInputVal(prev => prev.slice(0, -1));
              } else if (/^[0-9]$/.test(e.key)) {
                  setInputVal(prev => (prev + e.key).slice(0, 4));
              }
          } else if (breachStep === 4) {
              if (e.key === 'Enter') {
                  setBreachStep(5); // Go to execution
              } else if (e.key === 'Delete' || e.key === 'Backspace') {
                  setBreachStep(6); // Go to self destruct
              }
          }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screenState, lines, breachStep, inputVal]);

  const renderBreachScreen = () => {
    switch(breachStep) {
      case 0: // Selection
              return (
                  <group position={[0, 0, 0]}>
                      <Text position={[0, 0.6, 0]} fontSize={0.1} color="#ef4444" anchorX="center">ORBITAL ASSET DIRECTORY</Text>
                      <Text position={[0, 0.45, 0]} fontSize={0.06} color="#ef4444" anchorX="center">CLASSIFIED ACCESS</Text>
                      
                      <Text position={[-1.1, 0.1, 0]} fontSize={0.07} color="#94a3b8" anchorX="left">
                        [1] SAT-A17 | GEO | ACTIVE
                      </Text>
                      <Text position={[-1.1, -0.1, 0]} fontSize={0.07} color="#94a3b8" anchorX="left">
                        [2] SAT-K09 | LEO | STANDBY
                      </Text>
                      <Text position={[-1.1, -0.3, 0]} fontSize={0.07} color="#ef4444" anchorX="left">
                        [3] SAT-X41 | MIL-RELAY | RESTRICTED
                      </Text>

                      <Text position={[0, -0.7, 0]} fontSize={0.07} color="#ffffff" anchorX="center">
                        SELECT ASSET [1-3]
                      </Text>
                  </group>
              );
          case 1: // Auth
              return (
                  <group position={[0, 0, 0]}>
                      <Text position={[0, 0.3, 0]} fontSize={0.08} color="#ef4444" anchorX="center">WARNING: RESTRICTED ASSET</Text>
                      <Text position={[0, 0.15, 0]} fontSize={0.08} color="#ef4444" anchorX="center">AUTHORIZATION REQUIRED</Text>
                      
                      <Text position={[0, -0.2, 0]} fontSize={0.1} color="#ffffff" anchorX="center">
                        ENTER ACCESS KEY:
                      </Text>
                      <Text position={[0, -0.4, 0]} fontSize={0.12} color="#38bdf8" anchorX="center">
                        {inputVal.padEnd(4, '_')}
                      </Text>
                  </group>
              );
          case 2: // Takeover
              return (
                  <group position={[0, 0, 0]}>
                      <Text position={[0, 0.2, 0]} fontSize={0.12} color="#ef4444" anchorX="center" maxWidth={2.5} textAlign="center">
                        TRANSFERRING CONTROL TO: LUCIFER
                      </Text>
                      <Text position={[0, -0.2, 0]} fontSize={0.06} color="#ef4444" anchorX="center">
                        NEURAL COMMAND INTERFACE INITIALIZING...
                      </Text>
                  </group>
              );
          case 3: // Sequence
              return (
                  <group position={[0, 0, 0]}>
                      <Text position={[0, 0.7, 0]} fontSize={0.08} color="#ef4444" anchorX="center">SYSTEM INTEGRITY CHECK</Text>
                      
                      {/* Status Blocks */}
                      <Text position={[-0.8, 0.4, 0]} fontSize={0.06} color="#ef4444" anchorX="left">COMM LAYER: ❌ LOCKED</Text>
                      <Text position={[-0.8, 0.25, 0]} fontSize={0.06} color="#f59e0b" anchorX="left">COMMAND BUS: ⚠ PARTIAL</Text>
                      <Text position={[-0.8, 0.1, 0]} fontSize={0.06} color="#ef4444" anchorX="left">FAILSAFE CORE: ❌ ACTIVE</Text>
                      
                      {/* Logs */}
                      <Text position={[0.4, 0.25, 0]} fontSize={0.05} color="#94a3b8" anchorX="left" maxWidth={1.2}>
                          {breachLogs.join('\n')}
                      </Text>

                      <Text position={[0, -0.3, 0]} fontSize={0.08} color="#ffffff" anchorX="center">INITIATING SYSTEM BYPASS...</Text>
                      
                      {/* Progress Bar */}
                      <mesh position={[0, -0.5, 0]}>
                          <planeGeometry args={[2, 0.1]} />
                          <meshBasicMaterial color="#1e293b" />
                      </mesh>
                      <mesh position={[-1 + (bypassProgress/100), -0.5, 0.01]}>
                          <planeGeometry args={[2 * (bypassProgress/100), 0.1]} />
                          <meshBasicMaterial color="#ef4444" />
                      </mesh>
                      
                      <Text position={[0, -0.7, 0]} fontSize={0.08} color="#ef4444" anchorX="center">
                        ANOMALOUS ACTIVITY DETECTED
                      </Text>
                  </group>
              );
          case 4: // Success
              return (
                  <group position={[0, 0, 0]}>
                      <Text position={[0, 0.5, 0]} fontSize={0.15} color="#00ff00" anchorX="center">SATELLITE CONTROL ACQUIRED</Text>
                      
                      <Text position={[-0.8, 0.1, 0]} fontSize={0.08} color="#38bdf8" anchorX="left">ATTITUDE CONTROL: ONLINE</Text>
                      <Text position={[-0.8, -0.1, 0]} fontSize={0.08} color="#38bdf8" anchorX="left">PAYLOAD ACCESS: ENABLED</Text>
                      <Text position={[-0.8, -0.3, 0]} fontSize={0.08} color="#38bdf8" anchorX="left">TELEMETRY FEED: LIVE</Text>
                      
                      <mesh position={[0, -0.6, 0]}>
                          <planeGeometry args={[1.5, 0.3]} />
                          <meshBasicMaterial color="#ef4444" />
                      </mesh>
                      <Text position={[0, -0.6, 0.01]} fontSize={0.1} color="#ffffff" anchorX="center" anchorY="middle">
                          ▶ [ENTER] EXECUTE DIRECTIVE
                      </Text>

                      <mesh position={[0, -0.9, 0]}>
                          <planeGeometry args={[1.5, 0.2]} />
                          <meshBasicMaterial color="#1e293b" />
                      </mesh>
                      <Text position={[0, -0.9, 0.01]} fontSize={0.08} color="#f59e0b" anchorX="center" anchorY="middle">
                          ⚠ [DEL] SELF DESTRUCT
                      </Text>
                  </group>
              );
          case 5: // Execution
              return (
                  <group position={[0, 0, 0]}>
                      <mesh>
                          <planeGeometry args={[2.8, 1.8]} />
                          <meshBasicMaterial color="#ef4444" transparent opacity={0.3} />
                      </mesh>
                      <Text position={[0, 0, 0]} fontSize={0.2} color="#ffffff" anchorX="center">
                          TARGET NEUTRALIZED
                      </Text>
                      <Text position={[0, -0.3, 0]} fontSize={0.1} color="#ffffff" anchorX="center">
                          MISSION COMPLETE
                      </Text>
                  </group>
              );
          case 6: // Self Destruct
              return (
                  <group position={[0, 0, 0]}>
                      <mesh>
                          <planeGeometry args={[2.8, 1.8]} />
                          <meshBasicMaterial color="#ef4444" />
                      </mesh>
                      <Text position={[0, 0.2, 0.01]} fontSize={0.2} color="#ffffff" anchorX="center">
                          ⚠ WARNING ⚠
                      </Text>
                      <Text position={[0, -0.2, 0.01]} fontSize={0.15} color="#000000" anchorX="center">
                          {breachLogs[0] || "INITIATING..."}
                      </Text>
                  </group>
              );
          default:
              return null;
      }
  };

  const getHint = () => {
       switch(screenState) {
           case 'initial': return "Press [ENTER] to Start System";
           case 'hacking': 
                if (lines.length > 0 && lines[lines.length - 1].includes("PRESS [ENTER]")) {
                    return "Press [ENTER] to Launch Dashboard";
                }
                return "System Hacking in Progress...";
           case 'dashboard': return "Press [ENTER] to Initiate Breach";
           case 'breach':
               if (breachStep === 0) return "Select Asset [3] for Classified";
               if (breachStep === 1) return "Hint: Passkey is '1234'";
               if (breachStep === 2) return "Establishing Neural Link...";
               if (breachStep === 3) return "Bypassing Security...";
               if (breachStep === 4) return "[ENTER] Execute | [DEL] Destruct";
               if (breachStep === 5) return "Mission In Progress...";
               if (breachStep === 6) return "Destruction Imminent...";
               return "";
           default: return "";
       }
   };

  return (
    <group>
      {/* Dynamic Interaction Hints */}
      <Html position={[0, 0, 0]} fullscreen style={{ pointerEvents: 'none' }}>
          {getHint() && (
              <div className="absolute bottom-4 right-4 text-xs font-mono text-cyan-400/80 bg-black/80 px-3 py-1.5 rounded select-none pointer-events-none border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  {`> ${getHint()}`}
              </div>
          )}
      </Html>

      <mesh>
        <planeGeometry args={[2.8, 1.8]} />
        <meshBasicMaterial color="#020617" />
      </mesh>
      
      <group position={[-1.3, 0.8, 0.01]}>
        {screenState === 'initial' || screenState === 'hacking' ? (
            <>
                <Text
                fontSize={0.08}
                color="#00ff00"
                anchorX="left"
                anchorY="top"
                maxWidth={2.6}
                lineHeight={1.2}
                >
                {lines.join('\n')}
                </Text>
                {screenState === 'initial' && (
                    <mesh position={[0, -1.4, 0]}>
                        <planeGeometry args={[0.08, 0.12]} />
                        <meshBasicMaterial color="#00ff00" transparent opacity={cursorVisible ? 0.8 : 0} />
                    </mesh>
                )}
            </>
        ) : screenState === 'dashboard' ? (
            <group position={[0, 0, 0]}>
                {/* Header Bar */}
                <mesh position={[1.3, 0, 0]}>
                    <planeGeometry args={[2.8, 0.25]} />
                    <meshBasicMaterial color="#1e293b" />
                </mesh>
                <Text position={[1.3, 0, 0.01]} fontSize={0.1} color="#ef4444" anchorX="center" anchorY="middle">
                    ⚠ SATELLITE UPLINK ACTIVE ⚠
                </Text>

                {/* Left Column - Globe/Radar */}
                <group position={[0.7, -0.7, 0]}>
                     <SatelliteGlobe />
                     <Text position={[0, -0.7, 0]} fontSize={0.06} color="#ef4444" anchorX="center">
                        TARGET: ORION-7 [LOCKED]
                     </Text>
                </group>

                {/* Right Column - Telemetry Data */}
                <group position={[1.9, -0.8, 0]}>
                    <mesh position={[0, 0.1, 0]}>
                        <planeGeometry args={[1.3, 1.5]} />
                        <meshBasicMaterial color="#0f172a" transparent opacity={0.8} />
                        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.2} />
                    </mesh>
                    <Text
                        position={[-0.55, 0.7, 0.01]}
                        fontSize={0.06}
                        color="#38bdf8"
                        anchorX="left"
                        anchorY="top"
                        maxWidth={1.2}
                        lineHeight={1.4}
                    >
                        {`ORBITAL TELEMETRY
-----------------
LAT:  ${telemetry.lat.toFixed(4)}° N
LON:  ${telemetry.lon.toFixed(4)}° W
ALT:  ${telemetry.alt.toFixed(1)} km
VEL:  7,600 m/s
AZM:  142.5°

SIGNAL: ${Math.floor(85 + Math.sin(Date.now()/1000)*5)}% [-42dBm]
STATUS: ${telemetry.lock < 100 ? 'DECRYPTING...' : 'VULNERABLE'}
LOCK:   [${'|'.repeat(Math.floor(telemetry.lock/5)).padEnd(20, '.')}]`}
                    </Text>
                </group>
            </group>
        ) : (
            <group position={[1.3, -0.9, 0]}>
                {renderBreachScreen()}
            </group>
        )}
      </group>
    </group>
  );
};

const Laptop = (props) => {
  const { theme } = useTheme();
  const lidGroup = useRef();
  const bodyColor = theme === 'dark' ? '#334155' : '#94a3b8';
  
  // Animation state
  const [isOpen, setIsOpen] = useState(false);
  const [rgbEnabled, setRgbEnabled] = useState(false);

  useEffect(() => {
    // Trigger open animation after mount
    setTimeout(() => setIsOpen(true), 500);

    const handleKeyDown = (e) => {
        if (e.key.toLowerCase() === 'r' && document.activeElement && document.activeElement.tagName !== 'INPUT') {
            setRgbEnabled(prev => !prev);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame((state, delta) => {
    if (lidGroup.current) {
      const targetRotation = isOpen ? -0.25 : Math.PI / 2;
      lidGroup.current.rotation.x = THREE.MathUtils.lerp(
        lidGroup.current.rotation.x,
        targetRotation,
        delta * 2
      );
    }
  });
  
  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: bodyColor,
    metalness: 0.9,
    roughness: 0.2,
  }), [bodyColor]);

  const keyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1e293b',
    roughness: 0.7,
  }), []);

  const screenBezelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0f172a',
    roughness: 0.2,
  }), []);

  const trackpadMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#475569',
    roughness: 0.5,
    metalness: 0.5,
  }), []);

  // RGB Material - We'll use a dynamic color in the render loop or just a simple emissive material
  // But standard material with emissive property is better
  const rgbKeyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1e293b',
    roughness: 0.7,
    emissive: '#ff0000',
    emissiveIntensity: 0.5
  }), []);

  useFrame((state) => {
      if (rgbEnabled) {
          const t = state.clock.getElapsedTime();
          const r = Math.sin(t) * 0.5 + 0.5;
          const g = Math.sin(t + 2) * 0.5 + 0.5;
          const b = Math.sin(t + 4) * 0.5 + 0.5;
          rgbKeyMaterial.emissive.setRGB(r, g, b);
      } else {
          rgbKeyMaterial.emissive.setHex(0x000000);
      }
  });

  return (
    <group {...props}>
      {/* RGB Hint Text */}
      <Html position={[0, 0, 0]} fullscreen style={{ pointerEvents: 'none' }}>
          <div className="absolute bottom-4 left-4 text-xs font-mono text-white/50 bg-black/50 px-2 py-1 rounded select-none pointer-events-none">
              Press [R] for RGB
          </div>
      </Html>

      {/* Base */}
      <mesh position={[0, -0.1, 0]} material={metalMaterial}>
        <boxGeometry args={[3.2, 0.2, 2.2]} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.005, 0.6]} rotation={[-Math.PI / 2, 0, 0]} material={rgbEnabled ? rgbKeyMaterial : trackpadMaterial}>
        <planeGeometry args={[1, 0.7]} />
      </mesh>

      {/* Side Ports (USB-C) */}
      <mesh position={[-1.61, -0.05, -0.5]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.02, 0.1, 4, 8]} />
          <meshBasicMaterial color="#000" />
      </mesh>
      <mesh position={[-1.61, -0.05, -0.2]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.02, 0.1, 4, 8]} />
          <meshBasicMaterial color="#000" />
      </mesh>
      {/* Headphone Jack */}
      <mesh position={[1.61, -0.05, 0.5]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.01, 16]} />
          <meshBasicMaterial color="#111" />
      </mesh>

      {/* Keyboard Area */}
      <group position={[0, 0.02, -0.2]}>
         {/* Function Row */}
         {Array.from({ length: 14 }).map((_, i) => (
            <mesh key={`fr-${i}`} position={[-1.4 + i * 0.215, 0.04, -0.9]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
                <boxGeometry args={[0.18, 0.03, 0.12]} />
            </mesh>
         ))}

         {/* Number Row */}
         {Array.from({ length: 14 }).map((_, i) => (
            <mesh key={`nr-${i}`} position={[-1.4 + i * 0.215, 0.04, -0.7]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
                <boxGeometry args={[0.18, 0.05, 0.18]} />
            </mesh>
         ))}

         {/* QWERTY Row */}
         {Array.from({ length: 14 }).map((_, i) => (
            <mesh key={`qr-${i}`} position={[-1.35 + i * 0.215, 0.04, -0.48]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
                <boxGeometry args={[i === 0 ? 0.28 : 0.18, 0.05, 0.18]} />
            </mesh>
         ))}

         {/* ASDF Row */}
         {Array.from({ length: 13 }).map((_, i) => (
            <mesh key={`ar-${i}`} position={[-1.35 + i * 0.215, 0.04, -0.26]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
                <boxGeometry args={[i === 0 ? 0.32 : (i === 12 ? 0.35 : 0.18), 0.05, 0.18]} />
            </mesh>
         ))}

         {/* ZXCV Row */}
         {Array.from({ length: 12 }).map((_, i) => (
            <mesh key={`zr-${i}`} position={[-1.25 + i * 0.215, 0.04, -0.04]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
                <boxGeometry args={[i === 0 || i === 11 ? 0.42 : 0.18, 0.05, 0.18]} />
            </mesh>
         ))}

         {/* Bottom Row */}
         <mesh position={[-1.35, 0.04, 0.18]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[0.2, 0.05, 0.18]} />
         </mesh>
         <mesh position={[-1.1, 0.04, 0.18]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[0.2, 0.05, 0.18]} />
         </mesh>
         <mesh position={[-0.85, 0.04, 0.18]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[0.25, 0.05, 0.18]} />
         </mesh>
         <mesh position={[0, 0.04, 0.18]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[1.2, 0.05, 0.18]} />
         </mesh>
         <mesh position={[0.85, 0.04, 0.18]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[0.25, 0.05, 0.18]} />
         </mesh>
         
         {/* Arrow Keys */}
         <mesh position={[1.25, 0.04, 0.18]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[0.18, 0.05, 0.08]} />
         </mesh>
         <mesh position={[1.25, 0.04, 0.27]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[0.18, 0.05, 0.08]} />
         </mesh>
         <mesh position={[1.05, 0.04, 0.27]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[0.18, 0.05, 0.08]} />
         </mesh>
         <mesh position={[1.45, 0.04, 0.27]} material={rgbEnabled ? rgbKeyMaterial : keyMaterial}>
             <boxGeometry args={[0.18, 0.05, 0.08]} />
         </mesh>
      </group>

      {/* Hinge Cylinder */}
      <mesh position={[0, -0.05, -1.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 3.2, 32]} />
          <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Screen Hinge Group */}
      <group ref={lidGroup} position={[0, -0.05, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Offset for pivot point */}
        <group position={[0, 0, 0]}> 
            {/* Lid Back */}
            <mesh position={[0, 1.1, -0.05]} material={metalMaterial}>
                <boxGeometry args={[3.2, 2.2, 0.1]} />
            </mesh>
            
            {/* Logo */}
            <mesh position={[0, 1.1, -0.101]} rotation={[0, Math.PI, 0]}>
                <circleGeometry args={[0.15, 32]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Screen Bezel */}
            <mesh position={[0, 1.1, 0.01]} material={screenBezelMaterial}>
                <boxGeometry args={[3.1, 2.1, 0.05]} />
            </mesh>
            
            {/* Camera */}
            <mesh position={[0, 2.05, 0.04]}>
                <circleGeometry args={[0.03, 32]} />
                <meshBasicMaterial color="#111" />
            </mesh>

            {/* Screen Content */}
            <group position={[0, 1.1, 0.041]}>
                <Screen />
            </group>
        </group>
      </group>
    </group>
  );
};

const Laptop3D = () => {
  const group = useRef();
  
  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if(group.current){
          group.current.rotation.y = -0.5 + Math.sin(t * 0.2) * 0.1;
          group.current.position.y = Math.sin(t * 0.5) * 0.1;
      }
  });

  return (
    <group ref={group} rotation={[0, -0.5, 0]}>
        <Environment preset="city" />
        <Float rotationIntensity={0.1} floatIntensity={0} speed={0}>
            <Laptop />
        </Float>
        
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color="#000" transparent opacity={0.2} />
        </mesh>
    </group>
  );
};

export default Laptop3D;
