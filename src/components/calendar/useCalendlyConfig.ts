import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => ({
    name: formData?.companyName || '',
    email: formData?.email || '',
    customAnswers: {
      a2: formData?.phoneNumber || '' // Updated to use a2 for phone field based on Calendly form
    }
  });

  return {
    calendlyInitialized,
    getPrefillData
  };
};