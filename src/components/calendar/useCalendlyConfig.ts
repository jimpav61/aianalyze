import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = () => {
    const phoneNumber = formData?.phoneNumber?.trim() || '';
    
    console.log('[CALENDLY_DEBUG] Starting getPrefillData:', {
      formData,
      phoneNumber,
      hasPhoneNumber: !!phoneNumber,
      phoneNumberLength: phoneNumber.length,
      isPhoneCallEvent: true
    });

    // Following Calendly's official documentation for pre-populating data
    // For phone call events, the phone number must be a string in the location field
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: phoneNumber.toString(), // Ensure phone number is a string
      customAnswers: {
        a1: phoneNumber.toString() // Backup as string in custom answers
      }
    };

    console.log('[CALENDLY_DEBUG] Created prefill data:', {
      prefillData,
      phoneInLocation: prefillData.location,
      phoneInCustomAnswers: prefillData.customAnswers.a1,
      allFields: Object.keys(prefillData),
      locationValueType: typeof prefillData.location,
      customAnswerValueType: typeof prefillData.customAnswers.a1
    });

    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};