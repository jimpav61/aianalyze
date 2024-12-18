import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;
    const checkInterval = 200;
    const initialDelay = 1000;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const checkCalScript = () => {
      console.log("CalendarScript - Checking Cal availability, attempt:", attempts + 1);
      
      if (typeof (window as any).Cal !== 'undefined') {
        console.log("CalendarScript - Cal script loaded successfully");
        setIsScriptLoaded(true);
        setScriptError(null);
        clearInterval(intervalId);
        return true;
      }
      
      attempts++;
      if (attempts >= maxAttempts) {
        console.error("CalendarScript - Failed to load Cal script after maximum attempts");
        setScriptError('Failed to load calendar. Please refresh the page.');
        clearInterval(intervalId);
        return true;
      }
      
      return false;
    };

    const startChecking = () => {
      console.log("CalendarScript - Starting script check process");
      intervalId = setInterval(() => {
        const isDone = checkCalScript();
        if (isDone) {
          clearInterval(intervalId);
        }
      }, checkInterval);
    };

    timeoutId = setTimeout(startChecking, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};