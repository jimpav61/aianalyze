import { useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";

export const useCalApi = () => {
  const calInitialized = useRef(false);
  const calApiRef = useRef<any>(null);

  const initializeApi = async () => {
    try {
      const cal = await getCalApi();
      if (!cal) {
        throw new Error('Calendar API not initialized');
      }
      calApiRef.current = cal;
      return cal;
    } catch (error) {
      console.error('CalApi - Error initializing calendar API:', error);
      throw error;
    }
  };

  return {
    calInitialized,
    calApiRef,
    initializeApi
  };
};