import { useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

export const useCalendlyConfig = (formData?: CalendarFormData) => {
  const calendlyInitialized = useRef<boolean>(false);

  const getPrefillData = () => {
    console.log("useCalendlyConfig - Starting prefill with raw form data:", {
      fullFormData: formData,
      phoneNumber: formData?.phoneNumber,
      hasPhoneNumber: !!formData?.phoneNumber
    });
    
    // Try multiple approaches for phone number mapping
    const prefillData = {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      location: formData?.phoneNumber || '',
      customAnswers: {
        a1: formData?.phoneNumber || '',
        'phone-number': formData?.phoneNumber || '',
        phone: formData?.phoneNumber || '',
        'phone number': formData?.phoneNumber || '',
        'Phone Number': formData?.phoneNumber || '',
      }
    };

    console.log("useCalendlyConfig - Created prefill data:", {
      prefillData,
      phoneInLocation: prefillData.location,
      phoneInCustomAnswers: prefillData.customAnswers
    });
    return prefillData;
  };

  return {
    calendlyInitialized,
    getPrefillData
  };
};