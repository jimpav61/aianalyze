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
        a2: formData?.phoneNumber || '' // Using a2 for phone field based on Calendly form
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