import { useEffect, useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { CalendarFormData } from "@/types/analysis";

interface CalendarEmbedProps extends Omit<CalendarProps, 'formData'> {
  formData?: CalendarFormData;
}

export const CalendarEmbed = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarEmbedProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  
  const { handleBookingSuccess } = useBookingSuccess({ 
    formData, 
    analysis, 
    onSubmit 
  });
  
  const { calendlyInitialized, getPrefillData } = useCalendlyConfig(formData);
  const { handleCalendlyInit, handleEventScheduled } = useCalendlyEvents({
    formData,
    onBookingSuccess: handleBookingSuccess
  });

  useEffect(() => {
    // Log effect trigger
    console.log('[PHONE_TEST] Effect triggered:', {
      hasFormData: !!formData,
      phoneNumber: formData?.phoneNumber
    });

    // Check initialization conditions
    if (!calendarRef.current || calendlyInitialized.current || !calLink) {
      console.log('[PHONE_TEST] Initialization blocked:', {
        hasRef: !!calendarRef.current,
        isInitialized: calendlyInitialized.current,
        hasCalLink: !!calLink,
        phoneNumber: formData?.phoneNumber
      });
      return;
    }

    const calendlyUrl = `https://calendly.com/${calLink}`;
    const prefill = getPrefillData();
    
    console.log('[PHONE_TEST] Initializing Calendly:', {
      url: calendlyUrl,
      prefill,
      phoneNumber: formData?.phoneNumber
    });

    if (!window.Calendly) {
      console.error('[PHONE_TEST] Calendly not loaded');
      return;
    }

    calendlyInitialized.current = true;

    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: calendarRef.current,
      prefill,
      utm: {}
    });

    // Event listeners for testing
    window.addEventListener('calendly.init', () => {
      console.log('[PHONE_TEST] Init event:', {
        prefill,
        phoneNumber: formData?.phoneNumber
      });
      handleCalendlyInit(prefill);
    });

    window.addEventListener('calendly.event_scheduled', (e: any) => {
      console.log('[PHONE_TEST] Event scheduled:', {
        phoneNumber: formData?.phoneNumber,
        eventData: e?.data,
        invitee: e?.data?.invitee,
        questions: e?.data?.invitee?.questions,
        customAnswers: e?.data?.invitee?.customAnswers
      });
      handleEventScheduled(e);
    });

    return () => {
      console.log('[PHONE_TEST] Cleanup');
      if (calendarRef.current) {
        calendarRef.current.innerHTML = '';
      }
      calendlyInitialized.current = false;
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
      window.removeEventListener('calendly.init', handleCalendlyInit);
    };
  }, [calLink, handleBookingSuccess, formData, getPrefillData, handleCalendlyInit, handleEventScheduled]);

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        ref={calendarRef}
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};