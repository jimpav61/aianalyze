import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

// Simplified mapping focusing on most common Calendly phone field names
const PHONE_FIELD_MAPPINGS = {
  questions: {
    'a1': true,  // Common custom question ID
    'phone': true,  // Standard phone field
    'Phone': true,  // Alternate capitalization
    'phone_number': true,  // Snake case variant
    'phoneNumber': true,  // Camel case variant
    '1': true,  // Numeric question ID
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

    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      questions
    };

    console.log('[PHONE_DEBUG] Created prefill data:', {
      prefillData,
      questions
    });

    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};