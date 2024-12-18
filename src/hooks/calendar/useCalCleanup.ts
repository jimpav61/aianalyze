import { useEffect } from 'react';

export const useCalCleanup = (
  mounted: { current: boolean },
  calApiRef: { current: any },
  calInitialized: { current: boolean }
) => {
  useEffect(() => {
    return () => {
      console.log('CalCleanup - Cleaning up');
      mounted.current = false;
      
      if (calApiRef.current && calInitialized.current) {
        try {
          calApiRef.current('destroy');
          console.log('CalCleanup - Calendar destroyed successfully');
        } catch (e) {
          console.error('CalCleanup - Error destroying calendar:', e);
        }
      }
      calInitialized.current = false;
    };
  }, []);
};