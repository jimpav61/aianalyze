import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      const exists = typeof window !== 'undefined' && typeof (window as any).Cal !== 'undefined';
      console.log('CalScript - Cal object exists:', exists);
      return exists;
    };

    const loadScript = () => {
      console.log('CalScript - Starting script load check');
      
      if (checkCalExists()) {
        console.log('CalScript - Cal already available');
        setIsScriptLoaded(true);
        return;
      }

      const scriptLoadCheck = setInterval(() => {
        console.log('CalScript - Checking if Cal is loaded...');
        if (checkCalExists()) {
          console.log('CalScript - Cal loaded successfully');
          setIsScriptLoaded(true);
          clearInterval(scriptLoadCheck);
        }
      }, 100);

      // Clear interval after 10 seconds if script hasn't loaded
      setTimeout(() => {
        if (!checkCalExists()) {
          clearInterval(scriptLoadCheck);
          const errorMsg = 'Failed to load calendar script within timeout';
          console.error('CalScript -', errorMsg);
          setScriptError(errorMsg);
        }
      }, 10000);
    };

    loadScript();

    return () => {
      console.log('CalScript - Cleanup');
      setIsScriptLoaded(false);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};