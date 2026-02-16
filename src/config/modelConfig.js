/**
 * 3D Model Configuration
 * Controls which 3D models are displayed in different sections
 */

export const modelConfig = {
  // Skills section model preference
  skills: {
    // 'iss' | 'auto'
    preferredModel: 'iss',
    // Auto-detect based on device capabilities
    autoDetect: false,
  },
  
  // Other sections can be configured here
  // about: { preferredModel: 'shapes' },
  // contact: { preferredModel: 'particles' },
};

// Helper to get model preference
export const getModelPreference = (section = 'skills') => {
  const config = modelConfig[section];
  if (!config) return 'iss';
  
  if (config.autoDetect) {
    const isLowEnd = 
      navigator.deviceMemory && navigator.deviceMemory <= 4 ||
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    return isLowEnd ? config.preferredModel : config.preferredModel;
  }
  
  return config.preferredModel;
};
