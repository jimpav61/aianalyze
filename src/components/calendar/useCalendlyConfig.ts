import { useRef, useCallback } from 'react';
import { DetailedFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: DetailedFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = useCallback(() => {
    if (!formData) {
      console.log('[CALENDLY_DEBUG] No form data provided, returning empty prefill');
      return {};
    }

    const phoneNumber = formData?.phoneNumber || '';
    const ownerName = formData?.ownerName || '';
    const email = formData?.email || '';
    
    console.log('[CALENDLY_DEBUG] Building prefill data:', {
      phoneNumber,
      ownerName,
      email,
      formData
    });

    // Map phone number to all possible Calendly question field IDs
    const questions: Record<string, string> = {
      'a1': phoneNumber,
      'phone': phoneNumber,
      'Phone': phoneNumber,
      'phone_number': phoneNumber,
      'phoneNumber': phoneNumber,
      '1': phoneNumber,
    };

    const prefillData = {
      name: ownerName,
      email: email,
      questions
    };

    console.log('[CALENDLY_DEBUG] Created prefill data:', prefillData);

    return prefillData;
  }, [formData]);

  return {
    calendlyInitialized,
    getPrefillData
  };
};