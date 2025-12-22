I will implement the comprehensive 11-step Lunar Mission Simulation as detailed in your instructions.

### 1. Advanced Multi-Stage Rocket Models (`SpaceModels.jsx`)
I will reconstruct the rocket model to support the full staging sequence:
*   **Stage 1 & 2:** Detachable boosters for the initial ascent.
*   **Fairings:** Split-shell nose cone that separates to reveal the payload.
*   **Stage 3 (TLI Stage):** The engine responsible for the Trans-Lunar Injection burn.
*   **Service Module:** Enhanced with deployable **Solar Panels**.
*   **Lunar Module:** Features the animatable hatch and landing gear.

### 2. Comprehensive 11-Step Animation Sequence (`SpaceLaunch.jsx`)
I will expand the animation state machine to cover every phase you specified:
1.  **Launch:** Multi-stage ignition, liftoff, and sequential stage separations.
2.  **Orbit:** LEO establishment and solar panel deployment.
3.  **TLI:** Third stage burn and separation.
4.  **Transit:** Mid-course correction thruster firings.
5.  **LOI:** Service module burn to capture into lunar orbit.
6.  **Separation:** Orbiter/Lander separation.
7.  **Descent:** Powered descent with hazard avoidance maneuvering.
8.  **Landing:** Vertical descent and contact sensor activation.
9.  **Post-Landing:** Systems shutdown, hatch opening, and the **"Sahan Pramuditha" Flag Deployment** (pole assembly -> unfurling).
10. **Visuals:** Cinematic zoom on the flag and Earth observation (vibrant blue/clouds).
11. **Surface Ops:** Camera pans to simulate 360° documentation and instrument deployment.

### 3. Mission Control Center UI
*   **Real-time Telemetry:** Altitude, Velocity, and Fuel visuals.
*   **Comms Log:** A scrolling log that displays the specific checklist items and confirmations you listed (e.g., "Cabin pressure equalization", "Contact sensor activation").

### 4. Implementation Steps
1.  **Update `SpaceModels.jsx`**: Build the separable stages, fairings, and solar panels.
2.  **Update `SpaceLaunch.jsx`**:
    *   Define the granular `ANIMATION_STATES`.
    *   Build the master GSAP timeline synchronizing mechanical movements with the 11-step sequence.
    *   Implement the `MissionControlUI` to display the specific procedure text.
