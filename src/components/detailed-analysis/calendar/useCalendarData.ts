import { useRef, useCallback } from 'react';
import { StoredData } from './types';

export const useCalendarData = (initialFormData: any, initialAnalysis: any) => {
  const dataRef = useRef<StoredData>({
    formData: initialFormData ? structuredClone(initialFormData) : null,
    analysis: initialAnalysis ? structuredClone(initialAnalysis) : null
  });

  const setData = useCallback((newData: StoredData) => {
    if (!newData) return;
    
    dataRef.current = {
      formData: newData.formData ? structuredClone(newData.formData) : null,
      analysis: newData.analysis ? structuredClone(newData.analysis) : null
    };
  }, []);

  const getData = useCallback(() => {
    return dataRef.current;
  }, []);

  return {
    setCalendarData: setData,
    getCalendarData: getData
  };
};