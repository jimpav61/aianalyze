import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = () => {
    const phoneNumber = formData?.phoneNumber || '';
    
    console.log('[CALENDLY_DEBUG] Starting getPrefillData:', {
      formData,
      phoneNumber,
      hasPhoneNumber: !!phoneNumber,
      phoneNumberLength: phoneNumber.length
    });

    // Following Calendly's official documentation for pre-populating data
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: phoneNumber // Used for Phone call event types
    };

    console.log('[CALENDLY_DEBUG] Created prefill data:', {
      prefillData,
      phoneInLocation: prefillData.location,
      allFields: Object.keys(prefillData)
    });

    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};