import { useEffect } from 'react';

export const useCalendarCleanup = (
  mounted: { current: boolean },
  calApiRef: { current: any },
  calInitialized: { current: boolean }
) => {
  useEffect(() => {
    return () => {
      console.log('CalendarCleanup - Cleaning up');
      mounted.current = false;
      
      if (calApiRef.current && calInitialized.current) {
        try {
          calApiRef.current('destroy');
          console.log('CalendarCleanup - Calendar destroyed successfully');
        } catch (e) {
          console.error('CalendarCleanup - Error destroying calendar:', e);
        }
      }
      calInitialized.current = false;
    };
  }, []);
};