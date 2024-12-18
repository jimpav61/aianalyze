import { useState, useEffect, useRef } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const checkInterval = useRef<number | null>(null);

  useEffect(() => {
    const checkCalExists = () => {
      const exists = typeof window !== 'undefined' && typeof (window as any).Cal !== 'undefined';
      return exists;
    };

    const loadScript = () => {
      if (checkCalExists()) {
        setIsScriptLoaded(true);
        return;
      }

      // Try to load the script manually if it's not already loaded
      if (!document.querySelector('script[src*="cal.com/embed.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed.js';
        script.async = true;
        document.head.appendChild(script);
      }

      let attempts = 0;
      const maxAttempts = 30;
      
      checkInterval.current = window.setInterval(() => {
        attempts++;
        
        if (checkCalExists()) {
          setIsScriptLoaded(true);
          if (checkInterval.current) {
            window.clearInterval(checkInterval.current);
          }
        } else if (attempts >= maxAttempts) {
          if (checkInterval.current) {
            window.clearInterval(checkInterval.current);
          }
          setScriptError('Failed to load calendar script - please refresh the page');
        }
      }, 1000);
    };

    loadScript();

    return () => {
      if (checkInterval.current) {
        window.clearInterval(checkInterval.current);
      }
    };
  }, []); // Empty dependency array since this should only run once

  return { isScriptLoaded, scriptError };
};