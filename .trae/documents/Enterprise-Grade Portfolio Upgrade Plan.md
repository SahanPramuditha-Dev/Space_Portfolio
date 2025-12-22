I will upgrade the current portfolio to meet the high-end, enterprise-grade requirements. The plan involves introducing GSAP for advanced animations, implementing a robust Dark/Light mode system, and enhancing all existing components with interactive 3D elements and professional UI patterns.

### 1. Setup & Configuration
- **Install Dependencies**: Add `gsap` for high-performance animations.
- **Tailwind Configuration**: Enable `darkMode: 'class'` and configure CSS variables for semantic coloring (backgrounds, text, accents) to support smooth theme transitions.
- **Global Styles**: Define CSS variables in `index.css` for both light and dark themes.

### 2. Theme & Layout Infrastructure
- **ThemeContext**: Create a React Context to manage theme state (light/dark), persist preference to `localStorage`, and handle system preference detection.
- **ThemeToggle Component**: Build a polished toggle button with smooth icon transitions (Sun/Moon).
- **Navbar Update**: Integrate the `ThemeToggle` and ensure the navbar is responsive and accessible.

### 3. Component Enhancements
- **Hero Section**:
    - Integrate GSAP for a staggered entrance animation of text elements.
    - Enhance the 3D Sphere in `Hero.jsx` to be more interactive (react to mouse movement) and theme-aware (change color based on light/dark mode).
- **Skills Section**:
    - Convert simple cards into animated progress bars or a "radar" style chart using GSAP to visualize skill proficiency.
    - Add hover effects that trigger micro-interactions.
- **Projects Section**:
    - Implement a "3D Tilt" effect for project cards to add depth.
    - Add smooth image reveals and hover states.
- **Contact Section**:
    - Replace the simple "mailto" button with a functional-looking form (Name, Email, Message).
    - Implement floating label inputs and a multi-step submission animation (Submit -> Loading -> Success Checkmark).

### 4. Advanced 3D & Parallax
- **ThreeBackground**: Update the background stars/particles to change density and color based on the selected theme.
- **Scroll Animations**: Use GSAP ScrollTrigger to create parallax effects for section headers and background elements as the user scrolls.

### 5. Quality Assurance
- **Responsiveness**: Verify layout on mobile, tablet, and desktop.
- **Accessibility**: Ensure high contrast ratios in both modes and add missing ARIA labels.
- **Performance**: Optimize 3D rendering to pause when not in view.
