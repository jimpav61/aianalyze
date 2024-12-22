import { useRef, useCallback } from 'react';
import { DetailedFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: DetailedFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = useCallback(() => {
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

    console.log('[CALENDLY_DEBUG] Created prefill data:', {
      prefillData,
      questions
    });

    return prefillData;
  }, [formData]);

  const initCalendly = useCallback((prefill: any) => {
    console.log('[CALENDLY_DEBUG] Initializing Calendly with:', prefill);
    
    if (window.Calendly && !calendlyInitialized.current) {
      console.log('[CALENDLY_DEBUG] Calendly object found, initializing widget');
      calendlyInitialized.current = true;
      
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/chatsites/demo',
        parentElement: document.querySelector('.calendly-inline-widget'),
        prefill,
      });
      
      console.log('[CALENDLY_DEBUG] Widget initialized');
    } else {
      console.log('[CALENDLY_DEBUG] Calendly not ready or already initialized:', {
        hasCalendly: !!window.Calendly,
        isInitialized: calendlyInitialized.current
      });
    }
  }, []);

  return {
    calendlyInitialized,
    getPrefillData,
    initCalendly
  };
};