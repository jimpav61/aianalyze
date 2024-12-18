import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => ({
    name: formData?.companyName || '',
    email: formData?.email || '',
    questions: {
      a1: formData?.phoneNumber || '' // Calendly's phone field
    }
  });

  return {
    calendlyInitialized,
    getPrefillData
  };
};