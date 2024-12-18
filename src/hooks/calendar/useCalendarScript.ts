import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const checkCalScript = () => {
      if (typeof (window as any).Cal !== 'undefined') {
        console.log("CalendarScript - Cal script loaded successfully");
        setIsScriptLoaded(true);
        setScriptError(null);
        return true;
      }
      return false;
    };

    // Check immediately in case the script is already loaded
    if (checkCalScript()) {
      return;
    }

    // Set up a MutationObserver to watch for script load
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (checkCalScript()) {
          observer.disconnect();
        }
      });
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (!isScriptLoaded) {
        console.error("CalendarScript - Failed to load Cal script");
        setScriptError('Failed to load calendar. Please refresh the page.');
        observer.disconnect();
      }
    }, 10000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};