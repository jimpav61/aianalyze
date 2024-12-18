import { useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";

export const useCalendarApi = () => {
  const calInitialized = useRef(false);
  const calApiRef = useRef<any>(null);

  const initializeApi = async () => {
    try {
      const cal = await getCalApi();
      if (!cal) {
        console.error('CalendarApi - Calendar API not initialized');
        throw new Error('Calendar API not initialized');
      }
      calApiRef.current = cal;
      return cal;
    } catch (error) {
      console.error('CalendarApi - Error initializing calendar API:', error);
      throw error;
    }
  };

  return {
    calInitialized,
    calApiRef,
    initializeApi
  };
};