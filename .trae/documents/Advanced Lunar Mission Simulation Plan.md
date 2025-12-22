I will upgrade the `SpaceLaunch` component to perform a highly detailed, multi-stage mission simulation as requested.

### 1. Model Enhancements (`SpaceModels.jsx`)
*   **Rocket Upgrade:**
    *   Split the rocket into two distinct parts: **Command Module** (top) and **Service Module/Booster** (bottom) to allow for separation.
    *   Add realistic metallic materials (`metalness`, `roughness`) and emissive engine glows.
    *   Add a **Lunar Module (LM)** component that will be revealed/active during the landing phase.
    *   Add a **Flag** component with cloth simulation (or simple wind animation) for the planting sequence.
*   **Planet Upgrades:**
    *   **Earth:** Add a secondary sphere for atmospheric glow and simple cloud layers using noise shaders or semi-transparent materials.
    *   **Moon:** Add procedural craters (bump map or displacement) to the moon surface for realism during the close-up landing.

### 2. Advanced Animation Sequence (`SpaceLaunch.jsx`)
I will expand the state machine and GSAP timelines to include:
*   **Stage 1: Separation:**
    *   Rocket ascends.
    *   Booster detaches and falls away.
    *   Command/Lunar module continues.
*   **Stage 2: Lunar Approach & Descent:**
    *   Radar activation (visual scanning effect).
    *   Retro-thruster firing (particles directed downward).
    *   Touchdown on the Moon.
*   **Stage 3: EVA & Flag Planting:**
    *   Camera zooms in.
    *   Astronaut figure (simplified low-poly) exits.
    *   Flag planting animation with "Sahan Pramuditha" text.
    *   Camera pans to frame the astronaut, flag, and Earth in the background.

### 3. Visual & Audio Polish
*   **Lighting:** Implement dynamic lighting that changes from the warm glow of launch to the stark, high-contrast lighting of the lunar surface.
*   **UI Overlay:** Add a "Mission Control" style status overlay showing altitude, velocity, and current mission phase text (e.g., "APOLLO SEPARATION", "TOUCHDOWN CONFIRMED").
*   **Audio:** Add placeholders for specific mission control chatter and mechanical separation sounds.

### 4. Implementation Steps
1.  **Refactor Models:** Update `SpaceModels.jsx` with separable rocket parts, detailed Earth/Moon, and the Flag.
2.  **Update Scene Logic:** Rewrite `SpaceLaunch.jsx` to handle the complex multi-timeline sequence (Separation -> Landing -> EVA).
3.  **Enhance Particles:** Add specific particle effects for the separation explosion and lunar dust.
4.  **Mission Control UI:** Create a React overlay component for the flight data.
