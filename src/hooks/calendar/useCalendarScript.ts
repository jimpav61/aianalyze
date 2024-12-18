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
    const maxAttempts = 10;
    const checkInterval = 500;

    console.log('CalendarScript - Starting Cal.com script check');

    const intervalId = setInterval(() => {
      if (checkCalExists()) {
        console.log('CalendarScript - Cal successfully loaded');
        setIsScriptLoaded(true);
        setScriptError(null);
        clearInterval(intervalId);
        return;
      }

      attempts++;
      console.log(`CalendarScript - Attempt ${attempts}/${maxAttempts}`);

      if (attempts >= maxAttempts) {
        const errorMsg = 'Calendar failed to load. Please try again.';
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