import { useCallback } from 'react';
import { DetailedFormData } from '@/types/analysis';

interface UseCalendlyEventsProps {
  formData?: DetailedFormData;
  onBookingSuccess: () => void;
}

export const useCalendlyEvents = ({ formData, onBookingSuccess }: UseCalendlyEventsProps) => {
  const handleEventScheduled = useCallback((e: any) => {
    console.log('[CALENDLY_DEBUG] Event scheduled callback:', {
      formData,
      eventData: e?.data,
      invitee: e?.data?.invitee,
      questions: e?.data?.invitee?.questions,
      customAnswers: e?.data?.invitee?.customAnswers
    });
    onBookingSuccess();
  }, [formData, onBookingSuccess]);

  return {
    handleEventScheduled
  };
};