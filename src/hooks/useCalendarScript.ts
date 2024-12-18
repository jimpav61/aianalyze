import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      return typeof window !== 'undefined' && typeof (window as any).Cal !== 'undefined';
    };

    const loadScript = () => {
      if (checkCalExists()) {
        console.log('Calendar script already loaded');
        setIsScriptLoaded(true);
        return;
      }

      const scriptLoadCheck = setInterval(() => {
        if (checkCalExists()) {
          console.log('Calendar script loaded successfully');
          setIsScriptLoaded(true);
          clearInterval(scriptLoadCheck);
        }
      }, 100);

      // Clear interval after 10 seconds if script hasn't loaded
      setTimeout(() => {
        if (!checkCalExists()) {
          clearInterval(scriptLoadCheck);
          console.error('Calendar script failed to load within timeout');
          setScriptError('Failed to load calendar script');
        }
      }, 10000);
    };

    loadScript();

    return () => {
      setIsScriptLoaded(false);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};