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

    // Following Calendly's official documentation for pre-populating data
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: phoneNumber,
      questions: [
        {
          answer: phoneNumber,
          name: 'phone'
        }
      ]
    };

    console.log('[PHONE_DEBUG] Created prefill data:', prefillData);

    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};