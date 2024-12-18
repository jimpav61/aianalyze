import { useCallback } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendlyEventsProps {
  formData?: CalendarFormData;
  onBookingSuccess: () => void;
}

export const useCalendlyEvents = ({ formData, onBookingSuccess }: UseCalendlyEventsProps) => {
  const handleCalendlyInit = useCallback((prefill: any) => {
    console.log('[PHONE_TEST] Calendly initialized:', {
      phoneNumber: formData?.phoneNumber,
      prefillLocation: prefill?.location,
      prefillCustomAnswers: prefill?.customAnswers
    });
  }, [formData?.phoneNumber]);

  const handleEventScheduled = useCallback((e: any) => {
    console.log('[PHONE_TEST] Final booking data:', {
      phoneNumber: formData?.phoneNumber,
      location: e?.data?.invitee?.location,
      questions: e?.data?.invitee?.questions,
      customAnswers: e?.data?.invitee?.customAnswers
    });
    onBookingSuccess();
  }, [formData?.phoneNumber, onBookingSuccess]);

  return {
    handleCalendlyInit,
    handleEventScheduled
  };
};