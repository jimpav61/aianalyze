import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => {
    console.log("useCalendlyConfig - Creating prefill data with phone:", formData?.phoneNumber);
    
    const prefillData = {
      name: formData?.companyName || '',
      email: formData?.email || '',
      customAnswers: {
        a4: formData?.phoneNumber || '' // Updated to a4 to test this field mapping
      }
    };

    console.log("useCalendlyConfig - Final prefill data:", prefillData);
    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};