import { useRef, useCallback } from 'react';
import { StoredData } from './types';

export const useCalendarState = (formData: any, analysis: any) => {
  const storedDataRef = useRef<StoredData>({
    formData: formData ? structuredClone(formData) : null,
    analysis: analysis ? structuredClone(analysis) : null
  });

  const storeData = useCallback((data: StoredData) => {
    storedDataRef.current = {
      formData: data.formData ? structuredClone(data.formData) : null,
      analysis: data.analysis ? structuredClone(data.analysis) : null
    };
    console.log("[Calendar] Data stored:", storedDataRef.current);
  }, []);

  const getCurrentData = useCallback((): StoredData => {
    return storedDataRef.current;
  }, []);

  return {
    storeData,
    getCurrentData
  };
};