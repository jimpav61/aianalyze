import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => ({
    name: formData?.companyName || '',
    email: formData?.email || '',
    questions: {
      a2: formData?.phoneNumber || '' // Updated from a1 to a2 to match new Calendly question ID
    }
  });

  return {
    calendlyInitialized,
    getPrefillData
  };
};