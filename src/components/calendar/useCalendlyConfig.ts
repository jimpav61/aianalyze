import { useRef, useCallback } from 'react';
import { DetailedFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: DetailedFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = useCallback(() => {
    const phoneNumber = formData?.phoneNumber || '';
    
    console.log('[PHONE_DEBUG] Building prefill data:', {
      rawPhoneNumber: phoneNumber,
      formData
    });

    const questions: Record<string, string> = {
      'a1': phoneNumber,
      'phone': phoneNumber,
      'Phone': phoneNumber,
      'phone_number': phoneNumber,
      'phoneNumber': phoneNumber,
      '1': phoneNumber,
    };

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
  }, [formData]);

  const initCalendly = useCallback((prefill: any) => {
    if (window.Calendly && !calendlyInitialized.current) {
      calendlyInitialized.current = true;
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/chatsites/demo',
        parentElement: document.querySelector('.calendly-inline-widget'),
        prefill,
      });
    }
  }, []);

  return {
    calendlyInitialized,
    getPrefillData,
    initCalendly
  };
};