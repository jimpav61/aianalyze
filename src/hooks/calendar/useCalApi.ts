import { useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";

export const useCalApi = () => {
  const calInitialized = useRef(false);
  const calApiRef = useRef<any>(null);

  const initializeApi = async () => {
    try {
      console.log('CalApi - Starting API initialization');
      const cal = await getCalApi();
      
      if (!cal) {
        console.error('CalApi - Failed to get Cal API');
        return null;
      }
      
      console.log('CalApi - Successfully got Cal API');
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