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
      phoneNumberLength: phoneNumber.length,
      isPhoneCallEvent: true // Added to confirm event type
    });

    // Following Calendly's official documentation for pre-populating data
    // For phone call events, the phone number goes in the location field
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: phoneNumber, // Phone number goes here for phone call events
      customAnswers: {
        a1: phoneNumber // Backup in case the event type uses custom fields
      }
    };

    console.log('[CALENDLY_DEBUG] Created prefill data:', {
      prefillData,
      phoneInLocation: prefillData.location,
      phoneInCustomAnswers: prefillData.customAnswers.a1,
      allFields: Object.keys(prefillData)
    });

    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};