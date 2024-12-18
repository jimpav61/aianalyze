import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => ({
    name: formData?.companyName || '',
    email: formData?.email || '',
    phoneNumber: formData?.phoneNumber || '', // Map phone number directly
    questions: {} // Keep questions object empty since we don't have custom questions
  });

  return {
    calendlyInitialized,
    getPrefillData
  };
};