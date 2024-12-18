import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef(false);

  const getPrefillData = () => ({
    name: formData?.companyName || '',
    email: formData?.email || '',
    a1: formData?.phoneNumber || '' // Updated to use a1 for phone field
  });

  return {
    calendlyInitialized,
    getPrefillData
  };
};