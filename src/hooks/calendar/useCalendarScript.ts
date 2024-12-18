import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      const exists = typeof window !== 'undefined' && typeof (window as any).Cal !== 'undefined';
      console.log('CalScript - Checking Cal object:', exists);
      return exists;
    };

    const loadScript = () => {
      console.log('CalScript - Starting script load check');
      
      // If Cal is already available, we're done
      if (checkCalExists()) {
        console.log('CalScript - Cal already available');
        setIsScriptLoaded(true);
        return;
      }

      // Try to load the script manually if it's not already loaded
      if (!document.querySelector('script[src*="cal.com/embed.js"]')) {
        console.log('CalScript - Manually loading Cal script');
        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed.js';
        script.async = true;
        document.head.appendChild(script);
      }

      let attempts = 0;
      const maxAttempts = 30; // 30 seconds total
      
      const scriptLoadCheck = setInterval(() => {
        attempts++;
        console.log(`CalScript - Checking if Cal is loaded (attempt ${attempts}/${maxAttempts})...`);
        
        if (checkCalExists()) {
          console.log('CalScript - Cal loaded successfully');
          setIsScriptLoaded(true);
          clearInterval(scriptLoadCheck);
        } else if (attempts >= maxAttempts) {
          clearInterval(scriptLoadCheck);
          const errorMsg = 'Failed to load calendar script - please refresh the page';
          console.error('CalScript -', errorMsg);
          setScriptError(errorMsg);
        }
      }, 1000); // Check every second

      return () => {
        clearInterval(scriptLoadCheck);
      };
    };

    loadScript();

    return () => {
      console.log('CalScript - Cleanup');
      setIsScriptLoaded(false);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};