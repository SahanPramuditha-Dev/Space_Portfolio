# 3D Earth Fine-Tuning Guide

This guide explains all the parameters you can modify to fine-tune the 3D Earth visualization in your portfolio.

## Quick Start

The Earth configuration is located in `src/config/earthConfig.js`. You can modify values there or use the interactive controls panel.

## Main Parameters

### 🌍 Earth Core Settings

**Location:** `earthConfig.earth`

- **`radius`** (default: 1.65)
  - Base size of the Earth sphere
  - Range: 0.5 - 3.0
  - Higher = larger Earth

- **`widthSegments` / `heightSegments`** (default: 64)
  - Geometry detail level
  - Range: 16 - 128
  - Higher = smoother but more GPU intensive
  - Lower = better performance

- **`rotationSpeed`** (default: 0.05)
  - How fast Earth rotates (radians per second)
  - Range: 0 - 0.2
  - 0 = no rotation
  - Higher = faster rotation

- **`material.shininess`** (default: 15)
  - Surface reflectivity
  - Range: 0 - 100
  - Higher = more reflective/ocean-like

- **`material.emissiveIntensity`** (default: 2.4)
  - City lights brightness
  - Range: 0 - 5
  - Higher = brighter city lights at night

- **`material.emissiveColor`** (default: "#ffcc88")
  - Color of city lights
  - Try: "#ffcc88" (warm), "#ffffff" (white), "#60a5fa" (blue)

- **`material.specularColor`** (default: "#22d3ee")
  - Ocean/water highlight color
  - Try: "#22d3ee" (cyan), "#60a5fa" (blue), "#ffffff" (white)

- **`material.normalScale`** (default: [2, 2])
  - Bump map intensity
  - Higher = more pronounced terrain

- **`float.floatIntensity`** (default: 0.2)
  - How much Earth bobs up/down
  - Range: 0 - 1
  - 0 = no floating animation

- **`scale`** (default: 1.2)
  - Overall size multiplier
  - Range: 0.5 - 2.0

### ☁️ Clouds Layer

**Location:** `earthConfig.clouds`

- **`opacity`** (default: 0.85)
  - Cloud transparency
  - Range: 0 - 1
  - 0 = invisible, 1 = fully opaque

- **`rotationSpeed`** (default: 0.07)
  - Cloud rotation speed (slightly faster than Earth)
  - Creates realistic cloud movement

### 🌑 Cloud Shadows

**Location:** `earthConfig.cloudShadows`

- **`opacity`** (default: 0.22)
  - Shadow darkness
  - Range: 0 - 1
  - Higher = darker shadows

- **`color`** (default: "#0b1220")
  - Shadow color (very dark blue)

### 🌌 Atmosphere Glow

**Location:** `earthConfig.atmosphere`

- **`scale`** (default: 1.8)
  - How far the glow extends
  - Range: 1.0 - 3.0
  - Higher = thicker atmosphere

- **`color`** (default: "#60a5fa")
  - Atmosphere color (sky blue)
  - Try: "#60a5fa" (blue), "#a855f7" (purple), "#22d3ee" (cyan)

- **`intensity`** (default: 1.85)
  - Glow brightness
  - Range: 0 - 3
  - Higher = brighter glow

- **`power`** (default: 2.6)
  - Edge sharpness
  - Range: 1.0 - 5.0
  - Higher = sharper edge

### ✨ Particle Glow Shell

**Location:** `earthConfig.particles`

- **`opacity`** (default: 0.25)
  - Particle visibility
  - Range: 0 - 1
  - Creates subtle sparkle effect

- **`color`** (default: "#7dd3fc")
  - Particle color (light blue)

- **`size`** (default: 0.012)
  - Individual particle size

### 🌓 Terminator (Day/Night Line)

**Location:** `earthConfig.terminator`

- **`darkness`** (default: 0.35)
  - How dark the night side is
  - Range: 0 - 1
  - 0 = no darkness, 1 = completely dark

- **`nightColor`** (default: [0.04, 0.07, 0.12])
  - RGB color of night side
  - Very dark blue

### 🌈 Aurora Bands

**Location:** `earthConfig.aurora`

- **`enabled`** (default: true)
  - Toggle aurora effect on/off

- **Band 1 (Cyan)**
  - `radius`: 1.78
  - `opacity.base`: 0.12
  - `opacity.pulse`: 0.05 (pulsing amount)
  - `rotationSpeed`: 0.04

- **Band 2 (Purple)**
  - `radius`: 1.74
  - `opacity.base`: 0.08
  - `rotationSpeed`: -0.03 (opposite direction)

### 🌙 Moon

**Location:** `earthConfig.moon`

- **`enabled`** (default: true)
  - Show/hide moon

- **`radius`** (default: 0.4)
  - Moon size relative to Earth

- **`distance`** (default: 3.5)
  - Distance from Earth center

- **`orbitSpeed`** (default: 0.1)
  - How fast moon orbits

- **`rotationSpeed`** (default: 0.02)
  - Moon's own rotation

## Presets

### Realistic
- Balanced, natural-looking Earth
- Moderate city lights
- Standard cloud opacity

### Stylized
- Faster rotation
- Brighter city lights
- More visible aurora
- Enhanced colors

### Minimal
- Slower rotation
- Dimmer lights
- No aurora
- Reduced particles
- Better performance

### Cinematic
- Very slow, dramatic rotation
- Very bright city lights
- Strong aurora bands
- Enhanced atmosphere
- Best for presentations

## Performance Optimization

### Low-End Devices
- Reduce `widthSegments` and `heightSegments` to 32
- Lower `particle` opacity
- Disable aurora
- Reduce `atmosphere.scale`

### High-End Devices
- Increase segments to 128
- Higher particle counts
- Enhanced aurora
- Maximum atmosphere glow

## Advanced Tweaks

### Rotation Speeds
Different layers rotate at different speeds for realism:
- Earth: 0.05 (slowest)
- Clouds: 0.07 (slightly faster)
- Shadows: 0.09 (fastest)
- Moon orbit: 0.1

### Color Schemes

**Warm Earth:**
```javascript
emissiveColor: "#ffcc88"
specularColor: "#ffd700"
atmosphere.color: "#ffa500"
```

**Cool Earth:**
```javascript
emissiveColor: "#60a5fa"
specularColor: "#22d3ee"
atmosphere.color: "#3b82f6"
```

**Sci-Fi Earth:**
```javascript
emissiveColor: "#a855f7"
specularColor: "#ec4899"
atmosphere.color: "#8b5cf6"
```

## Real-Time Controls

Use the `EarthControls` component for interactive fine-tuning:

```jsx
import EarthControls from './components/EarthControls';

// In your component
const [earthConfig, setEarthConfig] = useState(earthConfig);
const [showControls, setShowControls] = useState(false);

<EarthControls
  isOpen={showControls}
  onClose={() => setShowControls(false)}
  onConfigChange={setEarthConfig}
/>
```

## Tips

1. **Start with presets** - They provide good starting points
2. **Adjust gradually** - Small changes make big differences
3. **Test performance** - Monitor FPS while adjusting
4. **Match your theme** - Colors should complement your portfolio
5. **Consider context** - Different settings for different sections

## Common Adjustments

### Make Earth More Visible
- Increase `earth.scale`
- Increase `atmosphere.intensity`
- Increase `earth.material.emissiveIntensity`

### Better Performance
- Reduce segments (64 → 32)
- Lower particle opacity
- Disable aurora
- Reduce cloud opacity

### More Dramatic
- Increase `float.floatIntensity`
- Enhance aurora opacity
- Increase atmosphere glow
- Slower rotation speed

### More Realistic
- Use "realistic" preset
- Normal rotation speeds
- Balanced opacity values
- Standard color scheme
