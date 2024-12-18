import { useCallback } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendlyEventsProps {
  formData?: CalendarFormData;
  onBookingSuccess: () => void;
}

export const useCalendlyEvents = ({ formData, onBookingSuccess }: UseCalendlyEventsProps) => {
  const handleCalendlyInit = useCallback((prefill: any) => {
    console.log("useCalendlyEvents - Calendly initialized with data:", {
      prefill,
      formDataPhone: formData?.phoneNumber,
      customAnswers: prefill?.customAnswers,
      location: prefill?.location
    });
  }, [formData?.phoneNumber]);

  const handleEventScheduled = useCallback((e: any) => {
    console.log("useCalendlyEvents - Booking successful, complete event data:", {
      event: e,
      formDataPhone: formData?.phoneNumber,
      inviteeData: e?.data?.invitee,
      inviteeFields: e?.data?.invitee?.fields,
      customAnswers: e?.data?.invitee?.customAnswers
    });
    onBookingSuccess();
  }, [formData?.phoneNumber, onBookingSuccess]);

  return {
    handleCalendlyInit,
    handleEventScheduled
  };
};