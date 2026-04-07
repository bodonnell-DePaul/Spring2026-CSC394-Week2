// ============================================================
// useWindowDimensions — Custom Hook for Responsive Layout
// ============================================================
// WHAT THIS DOES:
//   Returns the current { width, height } of the browser window
//   and re-renders the component whenever the window is resized.
//
// WITHOUT THIS:
//   Components would need to manually add/remove a 'resize'
//   event listener and store dimensions in state. Forgetting to
//   remove the listener in the cleanup function would cause a
//   memory leak — the listener keeps running even after the
//   component unmounts, updating state on an unmounted component.
// ============================================================

import { useState, useEffect } from 'react';

export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup — prevents memory leaks
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array = mount/unmount only

  return dimensions;
}
