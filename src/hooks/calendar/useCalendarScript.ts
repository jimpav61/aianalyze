import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      return typeof window !== 'undefined' && 'Cal' in window;
    };

    if (checkCalExists()) {
      console.log('Calendar script already loaded');
      setIsScriptLoaded(true);
      return;
    }

    const scriptCheck = setInterval(() => {
      if (checkCalExists()) {
        console.log('Calendar script loaded successfully');
        setIsScriptLoaded(true);
        clearInterval(scriptCheck);
      }
    }, 100);

    // Set timeout for script loading
    const timeoutId = setTimeout(() => {
      if (!checkCalExists()) {
        clearInterval(scriptCheck);
        setScriptError('Calendar script failed to load');
        console.error('Calendar script failed to load within timeout');
      }
    }, 5000);

    return () => {
      clearInterval(scriptCheck);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};