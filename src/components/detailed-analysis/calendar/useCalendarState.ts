import { useRef } from 'react';
import { StoredData } from './types';

export const useCalendarState = (formData: any, analysis: any) => {
  const storedDataRef = useRef<StoredData | null>(null);

  const storeData = (data: StoredData) => {
    storedDataRef.current = {
      formData: data.formData ? structuredClone(data.formData) : null,
      analysis: data.analysis ? structuredClone(data.analysis) : null
    };
    console.log("[Calendar] Data stored:", storedDataRef.current);
  };

  const getCurrentData = (): StoredData => {
    return storedDataRef.current || { formData, analysis };
  };

  return {
    storeData,
    getCurrentData
  };
};