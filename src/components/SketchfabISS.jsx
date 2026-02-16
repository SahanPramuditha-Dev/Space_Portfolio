import React, { useEffect, useRef } from 'react';

/**
 * Sketchfab ISS Embed (Primary).
 * Falls back to local GLB in `Skills.jsx` if it doesn't load quickly.
 */
const SketchfabISS = ({ onLoad, onFail }) => {
  const loadedRef = useRef(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!loadedRef.current && onFail) onFail();
    }, 12000);
    return () => window.clearTimeout(t);
  }, [onFail]);

  return (
    <iframe
      title="International Space Station : ISS"
      src="https://sketchfab.com/models/998767feb3b545f0b2f1394b69c5e2e6/embed?autospin=1&preload=1&transparent=1&ui_hint=0"
      className="w-full h-full border-0"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowFullScreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      frameBorder="0"
      onLoad={() => {
        loadedRef.current = true;
        if (onLoad) onLoad();
      }}
    />
  );
};

export default SketchfabISS;

