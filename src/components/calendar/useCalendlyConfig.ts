import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = () => {
    console.log("useCalendlyConfig - Creating prefill data with form data:", formData);
    
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: formData?.phoneNumber || '' // Changed to use 'location' field which is a default Calendly field
    };

    console.log("useCalendlyConfig - Final prefill data:", prefillData);
    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};