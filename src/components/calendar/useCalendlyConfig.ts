import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => {
    console.log("useCalendlyConfig - Creating prefill data with form data:", formData);
    
    // Split owner name into first and last name
    const [firstName = '', lastName = ''] = (formData?.ownerName || '').split(' ');
    
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: {
        type: "custom",
        value: formData?.phoneNumber || ''
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