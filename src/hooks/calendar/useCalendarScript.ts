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

    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed.js';
    script.async = true;
    
    let attempts = 0;
    const maxAttempts = 10;
    const checkInterval = 1000; // 1 second between checks

    const intervalId = setInterval(() => {
      if (checkCalExists()) {
        console.log('CalendarScript - Cal successfully loaded');
        setIsScriptLoaded(true);
        setScriptError(null);
        clearInterval(intervalId);
        return;
      }

      attempts++;
      console.log(`CalendarScript - Check attempt ${attempts}/${maxAttempts}`);

      if (attempts >= maxAttempts) {
        console.error('CalendarScript - Failed to load Cal after maximum attempts');
        setScriptError('Calendar failed to load. Please refresh the page.');
        clearInterval(intervalId);
      }
    }, checkInterval);

    script.onerror = () => {
      console.error('CalendarScript - Failed to load script');
      setScriptError('Calendar script failed to load. Please refresh the page.');
      clearInterval(intervalId);
    };

    document.body.appendChild(script);

    return () => {
      clearInterval(intervalId);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return { isScriptLoaded, scriptError };
};