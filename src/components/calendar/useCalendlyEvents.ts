import { useCallback } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendlyEventsProps {
  formData?: CalendarFormData;
  onBookingSuccess: () => void;
}

export const useCalendlyEvents = ({ formData, onBookingSuccess }: UseCalendlyEventsProps) => {
  const handleCalendlyInit = useCallback((prefill: any) => {
    console.log("CalendarEmbed - Calendly initialized with prefill data:", prefill);
  }, []);

  const handleEventScheduled = useCallback((e: any) => {
    console.log("CalendarEmbed - Booking successful, event data:", {
      event: e,
      phoneNumber: formData?.phoneNumber
    });
    onBookingSuccess();
  }, [formData?.phoneNumber, onBookingSuccess]);

  return {
    handleCalendlyInit,
    handleEventScheduled
  };
};