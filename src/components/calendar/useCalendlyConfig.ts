import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = () => {
    console.log("useCalendlyConfig - Starting prefill with raw form data:", formData);
    
    // Try all possible Calendly field mappings for phone
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: formData?.phoneNumber || '',
      customAnswers: {
        a1: formData?.phoneNumber || '',
        'phone-number': formData?.phoneNumber || '',
        phone: formData?.phoneNumber || '',
      }
    };

    console.log("useCalendlyConfig - Created prefill data:", prefillData);
    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};