import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      return typeof (window as any).Cal !== 'undefined';
    };

    const injectCalScript = () => {
      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed.js';
      script.async = true;
      document.head.appendChild(script);
      return script;
    };

    const cleanup = (script?: HTMLScriptElement) => {
      if (script) {
        script.remove();
      }
    };

    const initializeCalendar = () => {
      console.log('CalendarScript - Starting initialization');
      
      if (checkCalExists()) {
        console.log('CalendarScript - Cal already exists');
        setIsScriptLoaded(true);
        return;
      }

      let script: HTMLScriptElement | undefined;
      const existingScript = document.querySelector('script[src*="cal.com/embed.js"]');
      
      if (!existingScript) {
        console.log('CalendarScript - Injecting new Cal script');
        script = injectCalScript();
      }

      let attempts = 0;
      const maxAttempts = 30;
      const checkInterval = 200;

      const intervalId = setInterval(() => {
        attempts++;
        console.log(`CalendarScript - Check attempt ${attempts}/${maxAttempts}`);

        if (checkCalExists()) {
          console.log('CalendarScript - Cal successfully loaded');
          setIsScriptLoaded(true);
          setScriptError(null);
          clearInterval(intervalId);
          return;
        }

        if (attempts >= maxAttempts) {
          console.error('CalendarScript - Failed to load Cal after maximum attempts');
          setScriptError('Calendar failed to load. Please refresh the page.');
          clearInterval(intervalId);
          cleanup(script);
        }
      }, checkInterval);

      return () => {
        clearInterval(intervalId);
        cleanup(script);
      };
    };

    const timeoutId = setTimeout(initializeCalendar, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};