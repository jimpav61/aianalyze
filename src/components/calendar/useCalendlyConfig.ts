import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

// Comprehensive mapping of all possible Calendly phone field variations
const PHONE_FIELD_MAPPINGS = {
  questions: {
    'phone': true,
    'Phone': true,
    'phone_number': true,
    'phoneNumber': true,
    'q_phone_number': true, // Added the specific field ID from Calendly form
    'a1': true,
    'a2': true,
    'a3': true,
    '1': true,
    '2': true,
    '3': true,
    'phone*': true,
    'Phone*': true,
    'Contact Number': true,
    'Contact Number*': true,
    'Mobile': true,
    'Mobile*': true,
    'Cell': true,
    'Cell*': true,
    'Telephone': true,
    'Telephone*': true,
  }
};

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = () => {
    const phoneNumber = formData?.phoneNumber || '';
    
    console.log('[PHONE_DEBUG] Building prefill data:', {
      rawPhoneNumber: phoneNumber,
      formData
    });

    // Create a questions object with all possible phone field mappings
    const questions: Record<string, string> = {};
    Object.keys(PHONE_FIELD_MAPPINGS.questions).forEach(key => {
      questions[key] = phoneNumber;
    });

    // Also try standard Calendly prefill format
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: phoneNumber, // Some Calendly forms use location for phone
      customAnswers: {
        phone: phoneNumber,
        'phone*': phoneNumber,
        'Phone': phoneNumber,
        'Phone*': phoneNumber,
        'q_phone_number': phoneNumber, // Added the specific field ID here too
      },
      questions
    };

    console.log('[PHONE_DEBUG] Created prefill data:', {
      prefillData,
      questions,
      customAnswers: prefillData.customAnswers
    });

    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};