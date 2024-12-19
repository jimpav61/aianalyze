import { useCallback } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendarEventsProps {
  onEventScheduled: () => void;
  formData?: CalendarFormData;
}

export const useCalendarEvents = ({ onEventScheduled, formData }: UseCalendarEventsProps) => {
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
    onEventScheduled();
  }, [formData?.phoneNumber, onEventScheduled]);

  return {
    handleCalendlyInit,
    handleEventScheduled
  };
};