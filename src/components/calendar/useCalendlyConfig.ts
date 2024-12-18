import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

const PHONE_FIELD_MAPPINGS = {
  location: true,  // Try Calendly's built-in location field
  customAnswers: {
    a1: true,
    'phone-number': true,
    phone: true,
    'phone number': true,
    'Phone Number': true,
    'questions.1': true, // Additional Calendly field format
    'questions.phone': true // Additional Calendly field format
  }
};

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = () => {
    const phoneNumber = formData?.phoneNumber || '';
    
    // Log initial form data
    console.log('[PHONE_TEST] Initial form data:', {
      hasFormData: !!formData,
      phoneNumber,
      formData
    });

    // Create prefill object with all possible phone mappings
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: phoneNumber, // Try location field
      customAnswers: Object.keys(PHONE_FIELD_MAPPINGS.customAnswers).reduce((acc, key) => ({
        ...acc,
        [key]: phoneNumber
      }), {})
    };

    // Log created prefill data
    console.log('[PHONE_TEST] Created prefill data:', {
      phoneNumber,
      locationField: prefillData.location,
      customAnswers: prefillData.customAnswers
    });

    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};