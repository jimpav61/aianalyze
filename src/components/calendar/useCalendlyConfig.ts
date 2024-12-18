import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => ({
    name: formData?.companyName || '',
    email: formData?.email || '',
    questions: {
      a1: formData?.phoneNumber || '' // Changed back to a1 to match Calendly's form field
    }
  });

  return {
    calendlyInitialized,
    getPrefillData
  };
};