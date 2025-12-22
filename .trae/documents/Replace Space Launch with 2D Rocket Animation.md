# Remove Space Launch Feature & Implement 2D Rocket Animation

## 1. Cleanup Phase
*   **Remove Files**: Delete the following files to completely remove the existing 3D space launch feature:
    *   `src/components/SpaceLaunch.jsx`
    *   `src/components/SpaceModels.jsx`
    *   `src/components/SpaceParticles.jsx`
*   **Update Dependencies**: Note that `three`, `@react-three/fiber`, and `@react-three/drei` will be **kept** because they are used by `ThreeBackground.jsx` for the background stars effect.
*   **Clean References**: Remove `SpaceLaunch` import and usage from `src/components/Hero.jsx`.

## 2. Implementation Phase (2D Animation)
*   **New Component**: Create `src/components/RocketLaunch.jsx`.
*   **Design & Style**:
    *   Implement a **flat, vector-style rocket** using SVG/CSS to match the Dribbble reference.
    *   Use **Framer Motion** (already in `package.json`) for smooth, high-performance 2D animations.
*   **Animation Sequence**:
    1.  **Idle**: Rocket on launchpad with subtle engine idle vibration.
    2.  **Launch**: Powerful lift-off with expanding smoke/fire effects.
    3.  **Ascent**: Rocket rises while clouds/stars parallax downwards.
    4.  **Orbit**: Smooth floating state.
*   **Responsiveness**: Ensure the animation scales correctly for different screen sizes.

## 3. Integration Phase
*   **Update Hero**: Import and render the new `RocketLaunch` component within `src/components/Hero.jsx`.
*   **Styling**: Adjust container dimensions in `Hero.jsx` to accommodate the new 2D aspect ratio.

## 4. Verification
*   **Build Check**: Ensure the application compiles without errors.
*   **Visual Test**: Verify the animation smoothness and style match the requirements.
