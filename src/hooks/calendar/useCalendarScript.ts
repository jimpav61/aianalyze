import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    let scriptLoadAttempts = 0;
    const maxAttempts = 20;
    const checkInterval = 500;

    const checkCalScript = () => {
      if (typeof (window as any).Cal !== 'undefined') {
        console.log("CalendarScript - Cal script loaded successfully");
        setIsScriptLoaded(true);
        setScriptError(null);
        return true;
      }
      return false;
    };

    // Check immediately in case script is already loaded
    if (checkCalScript()) {
      return;
    }

    // Load script if not present
    const calScript = document.querySelector('script[src*="cal.com/embed.js"]');
    if (!calScript) {
      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      console.log("CalendarScript - Injected Cal script");
    }

    // Set up interval to check for script load
    const intervalId = setInterval(() => {
      scriptLoadAttempts++;
      console.log(`CalendarScript - Checking Cal availability (${scriptLoadAttempts}/${maxAttempts})`);

      if (checkCalScript()) {
        clearInterval(intervalId);
        return;
      }

      if (scriptLoadAttempts >= maxAttempts) {
        console.error("CalendarScript - Failed to load Cal script after maximum attempts");
        setScriptError('Failed to load calendar. Please refresh the page.');
        clearInterval(intervalId);
      }
    }, checkInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};