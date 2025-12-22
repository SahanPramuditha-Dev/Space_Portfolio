I will replace the existing `AnimatedSphere` in `Hero.jsx` with a sophisticated `SpaceLaunch` 3D component. This new component will orchestrate a multi-stage space animation sequence using React Three Fiber and GSAP.

### 1. Scene Composition
*   **Rocket Model:** Create a procedural low-poly rocket using basic Three.js geometries (Cone, Cylinder, Fins) to keep performance high and avoid loading external assets.
*   **Launch Pad (Earth):** A stylized spherical segment representing Earth, featuring a subtle rotation.
*   **The Moon:** A textured sphere that will appear in the later stages of the animation.
*   **Particle Systems:**
    *   **Propulsion:** High-velocity particles emitting from the rocket tail.
    *   **Dust:** Ground particles that disperse upon launch and landing.
    *   **Stars:** Reuse and enhance the existing star background for depth.

### 2. Animation Stages (State Machine)
I will implement a state-driven animation using `useState` and `useFrame`:
*   **Stage 0: Idle on Pad:** Rocket sits on Earth; subtle idle hover.
*   **Stage 1: Launch:** Ignite thrusters (particles), camera shakes, rapid ascent.
*   **Stage 2: Travel:** Rocket rotates, Earth moves down, Moon moves into view, stars streak past (warp effect).
*   **Stage 3: Landing:** Retro-thrusters fire, smooth descent onto the Moon surface, dust settling.

### 3. Interactivity & Controls
*   **Play/Pause Control:** A dedicated UI button overlaid on the 3D canvas to toggle the `animationState` (paused/playing).
*   **Responsiveness:** Use `useThree` and `viewport` hooks to scale elements appropriately for mobile vs. desktop.

### 4. Technical Implementation Details
*   **File Structure:** Create `src/components/SpaceLaunch.jsx` to encapsulate this complex logic.
*   **Performance:** Use `instancedMesh` for particles to maintain 60fps. Limit shadow casting to essential elements.
*   **Sound:** Integrate `useAudio` (or HTML5 Audio) for launch rumble and landing hiss, synchronized with state transitions.

### 5. Integration
*   Replace the `<Hero3D />` component in `Hero.jsx` with the new `<SpaceLaunch />` component.
*   Ensure it sits within the existing grid layout but takes prominence.
