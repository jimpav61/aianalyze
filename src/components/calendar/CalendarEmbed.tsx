import { useEffect } from "react";
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
    if (calendlyInitialized.current) {
      return;
    }

    const calendlyUrl = `https://calendly.com/${calLink}`;
    const element = document.getElementById('calendly-booking-placeholder');
    
    if (!element) {
      console.error("CalendarEmbed - Could not find placeholder element");
      return;
    }

    element.innerHTML = '';
    const prefill = getPrefillData();
    
    console.log("CalendarEmbed - Initializing with config:", {
      url: calendlyUrl,
      prefill,
      phoneDetails: {
        originalNumber: formData?.phoneNumber,
        prefillValue: prefill.questions.a2
      }
    });

    // @ts-ignore - Calendly types are not available
    if (!window.Calendly) {
      console.error("CalendarEmbed - Calendly not loaded");
      return;
    }

    calendlyInitialized.current = true;

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.init', () => handleCalendlyInit(prefill));
    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', handleEventScheduled);

    // @ts-ignore - Calendly types are not available
    Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: element,
      prefill,
      utm: {}
    });

    return () => {
      if (element) {
        element.innerHTML = '';
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
        id="calendly-booking-placeholder" 
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};