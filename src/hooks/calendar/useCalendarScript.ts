import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      return typeof (window as any).Cal !== 'undefined';
    };

    if (checkCalExists()) {
      console.log('CalendarScript - Cal already exists');
      setIsScriptLoaded(true);
      return;
    }

    let attempts = 0;
    const maxAttempts = 20; // Increased max attempts
    const checkInterval = 500; // Reduced interval to 500ms

    const intervalId = setInterval(() => {
      console.log(`CalendarScript - Checking Cal existence (${attempts + 1}/${maxAttempts})`);
      
      if (checkCalExists()) {
        console.log('CalendarScript - Cal successfully loaded');
        setIsScriptLoaded(true);
        setScriptError(null);
        clearInterval(intervalId);
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        const errorMsg = 'Calendar failed to load. Please refresh the page.';
        console.error('CalendarScript - ' + errorMsg);
        setScriptError(errorMsg);
        clearInterval(intervalId);
      }
    }, checkInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};