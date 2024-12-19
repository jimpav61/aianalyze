import { useCallback } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendlyEventsProps {
  formData?: CalendarFormData;
  onBookingSuccess: () => void;
}

export const useCalendlyEvents = ({ formData, onBookingSuccess }: UseCalendlyEventsProps) => {
  const handleCalendlyInit = useCallback((prefill: any) => {
    console.log('[CALENDLY_DEBUG] Calendly initialization:', {
      phoneNumber: formData?.phoneNumber,
      prefillData: prefill,
      eventType: window?.Calendly?.eventType,
      initTime: new Date().toISOString()
    });
  }, [formData?.phoneNumber]);

  const handleEventScheduled = useCallback((e: any) => {
    console.log('[CALENDLY_DEBUG] Event scheduled:', {
      phoneNumber: formData?.phoneNumber,
      eventData: e?.data,
      invitee: e?.data?.invitee,
      location: e?.data?.location,
      eventType: e?.data?.event_type,
      scheduledTime: new Date().toISOString()
    });
    onBookingSuccess();
  }, [formData?.phoneNumber, onBookingSuccess]);

  return {
    handleCalendlyInit,
    handleEventScheduled
  };
};