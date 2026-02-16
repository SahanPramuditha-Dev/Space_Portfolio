import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, RotateCcw } from 'lucide-react';
import { earthConfig, earthPresets } from '../config/earthConfig';

/**
 * Earth Controls Panel
 * Allows real-time fine-tuning of Earth parameters
 */
const EarthControls = ({ onConfigChange, isOpen, onClose }) => {
  const [config, setConfig] = useState(earthConfig);
  const [activePreset, setActivePreset] = useState('realistic');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (onConfigChange) {
      onConfigChange(config);
    }
  }, [config, onConfigChange]);

  const applyPreset = (presetName) => {
    const preset = earthPresets[presetName];
    if (preset) {
      setConfig(preset);
      setActivePreset(presetName);
    }
  };

  const resetToDefault = () => {
    setConfig(earthConfig);
    setActivePreset('realistic');
  };

  const updateNestedValue = (path, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = { ...prev };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-96 bg-primary/95 backdrop-blur-md border-l border-secondary z-[200] overflow-y-auto p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings size={24} className="text-accent" />
            <h2 className="text-2xl font-bold text-text">Earth Controls</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close controls"
          >
            <X size={20} />
          </button>
        </div>

        {/* Presets */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-text mb-2">Presets</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(earthPresets).map((preset) => (
              <button
                key={preset}
                onClick={() => applyPreset(preset)}
                className={`px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                  activePreset === preset
                    ? 'bg-accent text-primary'
                    : 'bg-secondary text-text hover:bg-secondary/80'
                }`}
              >
                {preset.charAt(0).toUpperCase() + preset.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={resetToDefault}
            className="mt-2 w-full px-3 py-2 bg-secondary text-text rounded-lg text-sm font-mono hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Reset to Default
          </button>
        </div>

        {/* Earth Rotation Speed */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-text mb-2">
            Earth Rotation Speed: {config.earth.rotationSpeed.toFixed(3)}
          </label>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            value={config.earth.rotationSpeed}
            onChange={(e) => updateNestedValue('earth.rotationSpeed', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* City Lights Intensity */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-text mb-2">
            City Lights Intensity: {config.earth.material.emissiveIntensity.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={config.earth.material.emissiveIntensity}
            onChange={(e) => updateNestedValue('earth.material.emissiveIntensity', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Cloud Opacity */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-text mb-2">
            Cloud Opacity: {config.clouds.opacity.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={config.clouds.opacity}
            onChange={(e) => updateNestedValue('clouds.opacity', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Atmosphere Intensity */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-text mb-2">
            Atmosphere Glow: {config.atmosphere.intensity.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={config.atmosphere.intensity}
            onChange={(e) => updateNestedValue('atmosphere.intensity', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Aurora Toggle */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.aurora.enabled}
              onChange={(e) => updateNestedValue('aurora.enabled', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-bold text-text">Enable Aurora Bands</span>
          </label>
        </div>

        {/* Advanced Settings */}
        <div className="mb-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-3 py-2 bg-secondary text-text rounded-lg text-sm font-mono hover:bg-secondary/80 transition-colors"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
          </button>
        </div>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              {/* Earth Scale */}
              <div>
                <label className="block text-sm font-bold text-text mb-2">
                  Earth Scale: {config.earth.scale.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={config.earth.scale}
                  onChange={(e) => updateNestedValue('earth.scale', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Float Intensity */}
              <div>
                <label className="block text-sm font-bold text-text mb-2">
                  Float Intensity: {config.earth.float.floatIntensity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.earth.float.floatIntensity}
                  onChange={(e) => updateNestedValue('earth.float.floatIntensity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Particle Opacity */}
              <div>
                <label className="block text-sm font-bold text-text mb-2">
                  Particle Opacity: {config.particles.opacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={config.particles.opacity}
                  onChange={(e) => updateNestedValue('particles.opacity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Terminator Darkness */}
              <div>
                <label className="block text-sm font-bold text-text mb-2">
                  Night Side Darkness: {config.terminator.darkness.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.terminator.darkness}
                  onChange={(e) => updateNestedValue('terminator.darkness', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 p-4 bg-secondary/30 rounded-lg border border-secondary/50">
          <p className="text-xs text-text-muted font-mono">
            Changes apply in real-time. Use presets for quick adjustments.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EarthControls;
