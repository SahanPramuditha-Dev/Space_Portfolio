import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './index.print.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// Smooth Scroll Polyfill for browsers without native scroll-behavior support
(() => {
  const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
  if (!supportsSmooth) {
    const originalScrollTo = window.scrollTo;
    window.scrollTo = (optionsOrX, y) => {
      if (typeof optionsOrX === 'object' && optionsOrX && optionsOrX.behavior === 'smooth') {
        const start = window.scrollY;
        const target = optionsOrX.top ?? 0;
        const duration = 400;
        let startTime = null;
        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const step = (ts) => {
          if (startTime === null) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = ease(progress);
          const next = start + (target - start) * eased;
          originalScrollTo(0, next);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      } else {
        originalScrollTo(optionsOrX, y);
      }
    };
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
