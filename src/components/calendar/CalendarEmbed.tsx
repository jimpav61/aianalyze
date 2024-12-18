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
    console.log("CalendarEmbed - Effect triggered with formData:", {
      formData,
      phoneNumber: formData?.phoneNumber
    });

    if (!calendarRef.current || calendlyInitialized.current || !calLink) {
      console.log("CalendarEmbed - Initialization conditions not met:", {
        hasRef: !!calendarRef.current,
        isInitialized: calendlyInitialized.current,
        hasCalLink: !!calLink,
        formData: formData,
        phoneNumber: formData?.phoneNumber
      });
      return;
    }

    const calendlyUrl = `https://calendly.com/${calLink}`;
    const prefill = getPrefillData();
    
    console.log("CalendarEmbed - Initializing Calendly with:", {
      url: calendlyUrl,
      prefill,
      rawFormData: formData,
      phoneNumber: formData?.phoneNumber
    });

    // @ts-ignore - Calendly types are not available
    if (!window.Calendly) {
      console.error("CalendarEmbed - Calendly not loaded");
      return;
    }

    calendlyInitialized.current = true;

    // @ts-ignore - Calendly types are not available
    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: calendarRef.current,
      prefill,
      utm: {}
    });

    console.log("CalendarEmbed - Calendly widget initialized with prefill:", {
      prefill,
      phoneNumber: formData?.phoneNumber
    });

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.init', () => {
      console.log("CalendarEmbed - Calendly init event fired with data:", {
        prefill,
        phoneNumber: formData?.phoneNumber
      });
      handleCalendlyInit(prefill);
    });

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', (e: any) => {
      console.log("CalendarEmbed - Event scheduled with complete data:", {
        event: e,
        formData,
        phoneNumber: formData?.phoneNumber,
        eventData: e?.data,
        inviteeData: e?.data?.invitee
      });
      handleEventScheduled(e);
    });

    return () => {
      console.log("CalendarEmbed - Cleanup triggered");
      if (calendarRef.current) {
        calendarRef.current.innerHTML = '';
      }
      calendlyInitialized.current = false;
      // @ts-ignore - Calendly types are not available
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
      // @ts-ignore - Calendly types are not available
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