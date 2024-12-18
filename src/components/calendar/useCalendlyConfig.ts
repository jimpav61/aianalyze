import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => {
    console.log("useCalendlyConfig - Creating prefill data with form data:", formData);
    
    // Split owner name into first and last name
    const [firstName = '', lastName = ''] = (formData?.ownerName || '').split(' ');
    
    const prefillData = {
      firstName,
      lastName,
      email: formData?.email || '',
      customAnswers: {
        a1: formData?.phoneNumber || '' // Testing a1 for phone field
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