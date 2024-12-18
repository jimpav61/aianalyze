import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      const exists = typeof window !== 'undefined' && 'Cal' in window;
      console.log('Calendar script check:', exists ? 'Found Cal object' : 'Cal object not found', window);
      return exists;
    };

    if (checkCalExists()) {
      console.log('Calendar script already loaded');
      setIsScriptLoaded(true);
      return;
    }

    console.log('Starting calendar script load check...', document.readyState);
    
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
        const errorMsg = 'Calendar script failed to load within timeout';
        setScriptError(errorMsg);
        console.error(errorMsg);
      }
    }, 10000);

    return () => {
      clearInterval(scriptCheck);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};