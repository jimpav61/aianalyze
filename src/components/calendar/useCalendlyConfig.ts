import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => ({
    name: formData?.companyName || '',
    email: formData?.email || '',
    customAnswers: {
      a1: formData?.phoneNumber || '' // Map phone number to customAnswers.a1
    }
  });

  return {
    calendlyInitialized,
    getPrefillData
  };
};