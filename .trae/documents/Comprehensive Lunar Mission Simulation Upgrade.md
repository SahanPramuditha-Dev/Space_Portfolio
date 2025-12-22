I will upgrade the existing `SpaceLaunch.jsx` simulation to strictly follow the detailed 11-step lunar mission profile you provided, enhancing both the visuals and the technical accuracy of the simulation.

### 1. Enhanced Mission Control UI
I will expand the `MissionControlUI` to display detailed real-time data for each of the 11 phases:
- **Phase Tracker**: A visual step indicator showing exactly which of the 11 steps is active.
- **Advanced Telemetry**:
  - **Velocity**: Display in km/s and Mach number.
  - **Altitude**: Real-time altitude tracking relative to Earth or Moon.
  - **Delta-V**: Fuel budget and usage monitoring.
  - **System Status**: Green/Yellow/Red status indicators for Propulsion, Guidance, and Life Support.
- **Event Log**: A scrolling terminal showing technical events (e.g., "Main Engine Cutoff", "Apogee Achievement", "PDI Initiated").

### 2. Precise 11-Step Simulation Logic
I will refactor the GSAP animation timeline to strictly adhere to your 11 steps:
1.  **Launch**: Staged ignition, liftoff, gravity turn.
2.  **Orbit**: Circularization burn to 7.8 km/s (LEO).
3.  **TLI**: Upper stage burn to ~10.9 km/s.
4.  **Separation**: Pyrotechnic visual effects for stage separation.
5.  **Cruise**: Mid-course correction simulation.
6.  **LOI**: Retrograde burn to capture into lunar orbit.
7.  **Lander Sep**: Visual undocking of the Lunar Module.
8.  **Descent Ignition**: Braking burn initiation.
9.  **Powered Descent**: Variable thrust visual effects and radar altimeter updates.
10. **Touchdown**: Contact light logic and engine cutoff.
11. **Shutdown**: Safe-ing of systems and transition to surface mode.

### 3. Visual Upgrades ("Attractive Rocket")
I will enhance the 3D models in `SpaceModels.jsx` to be more detailed and aesthetically pleasing:
- **Rocket**: Add geometric details like fuel lines, aerodynamic fins, and more complex engine nozzles.
- **Environment**: Improve the Earth and Moon shaders/materials for a better look.
- **Effects**: Enhance engine exhaust particles (launch smoke vs. space vacuum plumes).

### 4. Contingency & Abort Modes
I will add a "Simulation Mode" toggle:
- **Nominal**: The perfect mission flow.
- **Abort/Contingency**: A button to trigger a context-sensitive abort (e.g., "Launch Abort" triggers escape tower, "Landing Abort" triggers ascent stage bailout).

### 5. Technical Implementation
- **File**: `src/components/SpaceLaunch.jsx` (Logic & UI), `src/components/SpaceModels.jsx` (Visuals).
- **Libraries**: React Three Fiber, GSAP (for sequencing), Lucide React (icons).
