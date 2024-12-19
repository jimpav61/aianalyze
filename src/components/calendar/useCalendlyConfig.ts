import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = () => {
    const phoneNumber = formData?.phoneNumber || '';
    
    console.log('[PHONE_DEBUG] Building prefill data:', {
      rawPhoneNumber: phoneNumber,
      formData
    });

    // Using a custom question field for phone number
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      customAnswers: {
        a1: phoneNumber // This maps to the first custom question in Calendly
      }
    };

    console.log('[PHONE_DEBUG] Created prefill data:', prefillData);

    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};