import { useEffect } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { createCalendlyPrefill } from "@/utils/calendar";

export const CalendarEmbed = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  const { handleBookingSuccess } = useBookingSuccess({ 
    formData, 
    analysis, 
    onSubmit 
  });

  useEffect(() => {
    const calendlyUrl = `https://calendly.com/${calLink}`;
    const element = document.getElementById('calendly-booking-placeholder');
    
    if (!element) {
      console.error("CalendarEmbed - Could not find placeholder element");
      return;
    }

    // Clear any existing content
    element.innerHTML = '';
    
    // Create prefill object with form data
    const prefill = createCalendlyPrefill(formData);
    
    console.log("CalendarEmbed - Detailed debug info:", {
      calendlyUrl,
      formData,
      prefill,
      phoneNumber: {
        raw: formData?.phoneNumber,
        prefilled: prefill?.customAnswers?.a1,
      }
    });

    // Add event listener for prefill
    const handleCalendlyInit = (e: any) => {
      console.log("CalendarEmbed - Calendly initialized:", e);
    };

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.init', handleCalendlyInit);
    
    // @ts-ignore - Calendly types are not available
    Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: element,
      prefill,
      utm: {}
    });

    // Listen for booking success
    const handleEventScheduled = (e: any) => {
      console.log("CalendarEmbed - Booking successful, full event data:", {
        event: e,
        formData,
        prefill
      });
      handleBookingSuccess();
    };

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', handleEventScheduled);

    return () => {
      element.innerHTML = '';
      // @ts-ignore - Calendly types are not available
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
      // @ts-ignore - Calendly types are not available
      window.removeEventListener('calendly.init', handleCalendlyInit);
    };
  }, [calLink, handleBookingSuccess, formData]);

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