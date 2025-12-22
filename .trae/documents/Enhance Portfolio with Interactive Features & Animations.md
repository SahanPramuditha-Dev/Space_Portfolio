I have analyzed your existing codebase and found that you are using **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Three.js**. This is a solid foundation!

Here is the implementation plan to add the requested interactive features:

### 1. Global Animations & Scroll Progress
- **Create `ScrollProgress` Component**: A fixed progress bar at the top of the screen that fills as you scroll down.
- **Implement `SectionWrapper`**: A reusable component using **GSAP ScrollTrigger** or **Framer Motion** to ensure every section (About, Experience, Contact) enters with a consistent smooth fade-up and scale effect.

### 2. Enhanced Project Showcase (3D & Interactive)
- **Update `Projects.jsx`**:
  - **3D Card Flip**: Implement a true "Flip" effect on the project cards. The front will show the title/icon, and hovering/clicking will flip it 180° to reveal the description and tech stack.
  - **Parallax Depth**: Enhance the existing tilt effect to be more pronounced with parallax layers (text moving at different speeds than the card background).
  - **Loading State**: Add a simulated "loading" state (skeleton shimmer) to project cards that plays before the content appears, satisfying the "loading animations" requirement.

### 3. Interactive Background (Particles)
- **Update `ThreeBackground.jsx`**:
  - Currently, it renders a static rotating starfield.
  - **Interaction**: I will add mouse-following behavior. The stars/particles will slightly shift or rotate based on the user's cursor position, creating a depth-filled interactive backdrop.

### 4. Micro-interactions & UI Polish
- **Navbar & Buttons**: Add magnetic hover effects or spring-based scaling to navigation links and buttons using Framer Motion.
- **Contact Form**: Enhance `Contact.jsx` with animated input borders that draw themselves when focused, and a more robust success/error animation sequence.
- **Dark/Light Mode**: Ensure the existing toggle has a smooth transition for the icon and that the global theme colors transition smoothly (already partially set up, will refine).

### 5. Decorative Elements
- **SVG Animations**: Add subtle animated paths (using `framer-motion`'s `pathLength`) to section headers or as background decorations to make the layout feel more "alive".

### 6. Performance & Accessibility
- Ensure all animations use `transform` and `opacity` for 60fps performance.
- Respect `prefers-reduced-motion` media query to disable heavy animations for users who request it.
