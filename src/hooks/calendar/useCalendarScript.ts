import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      try {
        return typeof window !== 'undefined' && 
               window.hasOwnProperty('Cal') && 
               typeof (window as any).Cal === 'function';
      } catch (error) {
        console.error('Error checking Cal existence:', error);
        return false;
      }
    };

    const checkScriptLoaded = () => {
      const exists = checkCalExists();
      console.log('Cal object check:', exists ? 'Available' : 'Not available');
      
      if (exists) {
        console.log('Cal script loaded successfully');
        setIsScriptLoaded(true);
        clearInterval(scriptCheck);
      }
    };

    // Check immediately if Cal is already available
    if (checkCalExists()) {
      console.log('Cal already available on load');
      setIsScriptLoaded(true);
      return;
    }

    console.log('Starting Cal script load check...');
    const scriptCheck = setInterval(checkScriptLoaded, 100);

    // Set timeout for script loading
    const timeoutId = setTimeout(() => {
      if (!checkCalExists()) {
        clearInterval(scriptCheck);
        const errorMsg = 'Calendar script failed to load within timeout';
        console.error(errorMsg);
        setScriptError(errorMsg);
      }
    }, 10000);

    return () => {
      clearInterval(scriptCheck);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};