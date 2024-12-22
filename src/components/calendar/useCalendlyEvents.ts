import { useCallback } from 'react';
import { DetailedFormData } from '@/types/analysis';

interface UseCalendlyEventsProps {
  formData?: DetailedFormData;
  onBookingSuccess: () => void;
}

export const useCalendlyEvents = ({ formData, onBookingSuccess }: UseCalendlyEventsProps) => {
  const handleCalendlyInit = useCallback((prefill: any) => {
    console.log('[PHONE_DEBUG] Calendly init callback:', {
      phoneNumber: formData?.phoneNumber,
      prefill,
      questions: prefill?.questions
    });
  }, [formData?.phoneNumber]);

  const handleEventScheduled = useCallback((e: any) => {
    console.log('[PHONE_DEBUG] Event scheduled callback:', {
      phoneNumber: formData?.phoneNumber,
      eventData: e?.data,
      invitee: e?.data?.invitee,
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