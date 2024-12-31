import { useRef, useCallback } from 'react';
import { StoredData } from './types';

export const useCalendarState = (formData: any, analysis: any) => {
  // Initialize ref with initial data
  const storedDataRef = useRef<StoredData>({
    formData: formData ? structuredClone(formData) : null,
    analysis: analysis ? structuredClone(analysis) : null
  });

  // Define callbacks outside of any conditions
  const storeData = useCallback((data: StoredData) => {
    storedDataRef.current = {
      formData: data.formData ? structuredClone(data.formData) : null,
      analysis: data.analysis ? structuredClone(data.analysis) : null
    };
    console.log("[Calendar] Data stored:", storedDataRef.current);
  }, []); // Empty dependency array since we're only using ref

  const getCurrentData = useCallback((): StoredData => {
    return storedDataRef.current;
  }, []); // Empty dependency array since we're only using ref

  return {
    storeData,
    getCurrentData
  };
};