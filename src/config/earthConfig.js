/**
 * 3D Earth Configuration
 * Fine-tune all aspects of the Earth visualization
 */

export const earthConfig = {
  // === EARTH CORE SETTINGS ===
  earth: {
    // Base sphere geometry
    radius: 1.65,
    widthSegments: 64,  // Higher = smoother but more expensive
    heightSegments: 64,
    
    // Rotation speeds (radians per second)
    rotationSpeed: 0.05,  // Main Earth rotation
    cloudRotationSpeed: 0.07,  // Clouds layer rotation (slightly faster)
    shadowRotationSpeed: 0.09,  // Shadow layer rotation
    
    // Material properties
    material: {
      shininess: 15,  // How shiny the surface is (0-100)
      emissiveColor: "#ffcc88",  // City lights color
      emissiveIntensity: 2.4,  // How bright city lights are
      specularColor: "#22d3ee",  // Ocean/water specular highlight color
      normalScale: [2, 2],  // Bump map intensity [x, y]
    },
    
    // Float animation (gentle bobbing)
    float: {
      enabled: true,
      speed: 1,
      rotationIntensity: 0.1,  // How much it tilts
      floatIntensity: 0.2,  // How much it moves up/down
    },
    
    // Initial rotation
    initialRotation: [0.41, 0, 0],  // [x, y, z] in radians
    scale: 1.2,  // Overall scale multiplier
  },

  // === CLOUDS LAYER ===
  clouds: {
    radius: 1.67,  // Slightly larger than Earth
    opacity: 0.85,  // 0-1, transparency
    rotationSpeed: 0.07,
    blending: "AdditiveBlending",  // "AdditiveBlending" | "NormalBlending" | "MultiplyBlending"
  },

  // === CLOUD SHADOWS ===
  cloudShadows: {
    radius: 1.675,
    opacity: 0.22,
    color: "#0b1220",  // Dark shadow color
    blending: "MultiplyBlending",
  },

  // === ATMOSPHERE GLOW ===
  atmosphere: {
    scale: 1.8,  // How far the glow extends
    color: "#60a5fa",  // Sky blue glow color
    coef: 0.9,  // Edge falloff coefficient
    power: 2.6,  // Edge sharpness
    intensity: 1.85,  // Overall brightness multiplier
  },

  // === PARTICLE GLOW SHELL ===
  particles: {
    radius: 1.92,
    count: 32 * 32,  // Based on geometry segments
    size: 0.012,  // Particle size
    color: "#7dd3fc",  // Light blue
    opacity: 0.25,
    rotationSpeed: {
      y: 0.03,
      x: -0.015,
    },
  },

  // === TERMINATOR (DAY/NIGHT LINE) ===
  terminator: {
    scale: 1.705,
    darkness: 0.35,  // How dark the night side is (0-1)
    shadowTransition: {
      start: -0.2,  // Smooth transition start
      end: 0.25,  // Smooth transition end
    },
    nightColor: [0.04, 0.07, 0.12],  // RGB values for night side
  },

  // === AURORA BANDS ===
  aurora: {
    enabled: true,
    bands: [
      {
        radius: 1.78,
        thickness: 0.03,
        color: "#22d3ee",  // Cyan
        opacity: {
          base: 0.12,
          cinematic: 0.2,
          pulse: 0.05,  // Amount it pulses
          pulseSpeed: 1.2,
        },
        rotationSpeed: 0.04,
        tilt: [Math.PI / 2, 0, 0],
      },
      {
        radius: 1.74,
        thickness: 0.02,
        color: "#a855f7",  // Purple
        opacity: {
          base: 0.08,
          cinematic: 0.14,
          pulse: 0.04,
          pulseSpeed: 1.1,
        },
        rotationSpeed: -0.03,  // Negative = opposite direction
        tilt: [Math.PI / 2.2, 0, 0],
      },
    ],
  },

  // === MOON ===
  moon: {
    enabled: true,
    radius: 0.4,
    distance: 3.5,  // Distance from Earth center
    rotationSpeed: 0.02,  // Moon's own rotation
    orbitSpeed: 0.1,  // Moon's orbit around Earth
    tilt: [0.5, 0, 0],  // Orbit plane tilt
    material: {
      roughness: 0.8,  // Surface roughness (0-1)
      metalness: 0,  // Not metallic
    },
  },

  // === PERFORMANCE SETTINGS ===
  performance: {
    // Reduce segments for better performance on low-end devices
    lowEnd: {
      earthSegments: 32,
      cloudSegments: 32,
      particleSegments: 16,
    },
    // High quality settings
    highEnd: {
      earthSegments: 128,
      cloudSegments: 128,
      particleSegments: 64,
    },
    // Auto-detect based on device
    autoDetect: true,
  },

  // === BLACKOUT MODE (when focused/destructive) ===
  blackout: {
    earthEmissiveIntensity: 0.4,  // Dimmed city lights
    cloudOpacity: 0.4,
    particleOpacity: 0.08,
    transitionDuration: 1.2,  // seconds
  },

  // === CINEMATIC MODE ===
  cinematic: {
    earthRotation: {
      target: { x: 0.12, y: 1.4, z: 0 },
      duration: 2.5,
      ease: "power3.inOut",
    },
    cloudPeel: {
      opacity: 0,
      duration: 1.2,
    },
    nightToDay: {
      emissiveIntensity: 0.5,
      duration: 1.2,
    },
  },
};

// Helper function to get performance-optimized config
export const getPerformanceConfig = () => {
  if (!earthConfig.performance.autoDetect) {
    return earthConfig;
  }

  const isLowEnd = 
    navigator.deviceMemory && navigator.deviceMemory <= 4 ||
    navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isLowEnd) {
    return {
      ...earthConfig,
      earth: {
        ...earthConfig.earth,
        widthSegments: earthConfig.performance.lowEnd.earthSegments,
        heightSegments: earthConfig.performance.lowEnd.earthSegments,
      },
      clouds: {
        ...earthConfig.clouds,
        // Use lower segment count
      },
    };
  }

  return earthConfig;
};

// Preset configurations
export const earthPresets = {
  realistic: {
    ...earthConfig,
    earth: {
      ...earthConfig.earth,
      rotationSpeed: 0.05,
      material: {
        ...earthConfig.earth.material,
        emissiveIntensity: 2.4,
      },
    },
    clouds: {
      ...earthConfig.clouds,
      opacity: 0.85,
    },
  },
  
  stylized: {
    ...earthConfig,
    earth: {
      ...earthConfig.earth,
      rotationSpeed: 0.1,  // Faster rotation
      material: {
        ...earthConfig.earth.material,
        emissiveIntensity: 3.0,  // Brighter lights
        specularColor: "#ffffff",
      },
    },
    clouds: {
      ...earthConfig.clouds,
      opacity: 0.6,  // More transparent
    },
    aurora: {
      ...earthConfig.aurora,
      bands: earthConfig.aurora.bands.map(band => ({
        ...band,
        opacity: {
          ...band.opacity,
          base: band.opacity.base * 1.5,  // More visible aurora
        },
      })),
    },
  },
  
  minimal: {
    ...earthConfig,
    earth: {
      ...earthConfig.earth,
      rotationSpeed: 0.03,
      material: {
        ...earthConfig.earth.material,
        emissiveIntensity: 1.5,
      },
    },
    clouds: {
      ...earthConfig.clouds,
      opacity: 0.5,
    },
    aurora: {
      enabled: false,
    },
    particles: {
      ...earthConfig.particles,
      opacity: 0.1,
    },
  },
  
  cinematic: {
    ...earthConfig,
    earth: {
      ...earthConfig.earth,
      rotationSpeed: 0.02,  // Slower, more dramatic
      material: {
        ...earthConfig.earth.material,
        emissiveIntensity: 3.5,  // Very bright
      },
    },
    clouds: {
      ...earthConfig.clouds,
      opacity: 0.9,
    },
    aurora: {
      ...earthConfig.aurora,
      bands: earthConfig.aurora.bands.map(band => ({
        ...band,
        opacity: {
          ...band.opacity,
          base: band.opacity.base * 2,
          pulse: band.opacity.pulse * 1.5,
        },
      })),
    },
    atmosphere: {
      ...earthConfig.atmosphere,
      intensity: 2.5,
      power: 3.0,
    },
  },
};
