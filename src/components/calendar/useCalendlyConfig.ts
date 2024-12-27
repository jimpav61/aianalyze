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
    const companyName = formData?.companyName || '';
    
    console.log('[CALENDLY_DEBUG] Building prefill data:', {
      phoneNumber,
      ownerName,
      email,
      companyName,
      formData
    });

    // Map form data to all possible Calendly question field IDs
    const questions: Record<string, string> = {
      'a1': phoneNumber,
      'phone': phoneNumber,
      'Phone': phoneNumber,
      'phone_number': phoneNumber,
      'phoneNumber': phoneNumber,
      '1': phoneNumber,
      'company': companyName,
      'Company': companyName,
      'company_name': companyName,
      'companyName': companyName,
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