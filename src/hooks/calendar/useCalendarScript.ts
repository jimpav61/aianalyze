import { useState, useEffect } from 'react';

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window.Cal !== 'undefined') {
          console.log('Calendar script already loaded');
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed.js';
        script.onload = () => {
          console.log('Calendar script loaded successfully');
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load calendar script');
          reject(new Error('Failed to load calendar script'));
        };
        document.body.appendChild(script);
      });
    };

    loadScript()
      .then(() => {
        setIsScriptLoaded(true);
        setScriptError(null);
      })
      .catch((error) => {
        console.error('Error loading calendar:', error);
        setScriptError(error.message);
        setIsScriptLoaded(false);
      });

    return () => {
      const script = document.querySelector('script[src="https://app.cal.com/embed.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return { isScriptLoaded, scriptError };
};