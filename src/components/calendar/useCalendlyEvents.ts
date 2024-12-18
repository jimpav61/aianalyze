import { useCallback } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendlyEventsProps {
  formData?: CalendarFormData;
  onBookingSuccess: () => void;
}

export const useCalendlyEvents = ({ formData, onBookingSuccess }: UseCalendlyEventsProps) => {
  const handleCalendlyInit = useCallback((prefill: any) => {
    console.log("useCalendlyEvents - Calendly initialized with prefill:", {
      prefill,
      formDataPhone: formData?.phoneNumber
    });
  }, [formData?.phoneNumber]);

  const handleEventScheduled = useCallback((e: any) => {
    console.log("useCalendlyEvents - Booking successful, event data:", {
      event: e,
      formDataPhone: formData?.phoneNumber,
      inviteeData: e?.data?.invitee
    });
    onBookingSuccess();
  }, [formData?.phoneNumber, onBookingSuccess]);

  return {
    handleCalendlyInit,
    handleEventScheduled
  };
};