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
      script.src = 'https://cal.com/embed.js';
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error('CalendarScript - Failed to load script directly');
        setScriptError('Calendar script failed to load. Please refresh the page.');
      };
      document.head.appendChild(script);
      return script;
    };

    const cleanup = (script?: HTMLScriptElement) => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    let script: HTMLScriptElement | undefined;
    let timeoutId: NodeJS.Timeout;

    const initializeCalendar = () => {
      console.log('CalendarScript - Starting initialization');
      
      if (checkCalExists()) {
        console.log('CalendarScript - Cal already exists');
        setIsScriptLoaded(true);
        setScriptError(null);
        return;
      }

      const existingScript = document.querySelector('script[src*="cal.com/embed.js"]');
      
      if (!existingScript) {
        console.log('CalendarScript - Injecting new Cal script');
        script = injectCalScript();
      }

      let attempts = 0;
      const maxAttempts = 50; // Increased from 30
      const checkInterval = 200;

      const checkScriptLoaded = () => {
        if (checkCalExists()) {
          console.log('CalendarScript - Cal successfully loaded');
          setIsScriptLoaded(true);
          setScriptError(null);
          return true;
        }
        return false;
      };

      const intervalId = setInterval(() => {
        attempts++;
        console.log(`CalendarScript - Check attempt ${attempts}/${maxAttempts}`);

        if (checkScriptLoaded()) {
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

      // Initial check
      if (checkScriptLoaded()) {
        clearInterval(intervalId);
      }

      return () => {
        clearInterval(intervalId);
        cleanup(script);
      };
    };

    // Delay initial check to ensure DOM is ready
    timeoutId = setTimeout(initializeCalendar, 1000);

    return () => {
      clearTimeout(timeoutId);
      cleanup(script);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};