import { useEffect, useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";

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
  
  const calendlyInitialized = useRef(false);

  useEffect(() => {
    if (calendlyInitialized.current) {
      return; // Prevent multiple initializations
    }

    const calendlyUrl = `https://calendly.com/${calLink}`;
    const element = document.getElementById('calendly-booking-placeholder');
    
    if (!element) {
      console.error("CalendarEmbed - Could not find placeholder element");
      return;
    }

    // Clear any existing content
    element.innerHTML = '';
    
    // Create prefill object with form data - using Calendly's native phone field
    const prefill = {
      name: formData?.companyName || '',
      email: formData?.email || '',
      phoneNumber: formData?.phoneNumber || '' // Map directly to Calendly's phone field
    };
    
    console.log("CalendarEmbed - Initializing with config:", {
      url: calendlyUrl,
      prefill,
      phoneDetails: {
        originalNumber: formData?.phoneNumber,
        prefillValue: prefill.phoneNumber
      }
    });

    // Add event listener for prefill
    const handleCalendlyInit = (e: any) => {
      console.log("CalendarEmbed - Calendly initialized with prefill data:", prefill);
    };

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.init', handleCalendlyInit);
    
    // Initialize Calendly widget only once
    // @ts-ignore - Calendly types are not available
    if (!window.Calendly) {
      console.error("CalendarEmbed - Calendly not loaded");
      return;
    }

    calendlyInitialized.current = true;

    // @ts-ignore - Calendly types are not available
    Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: element,
      prefill,
      utm: {}
    });

    // Listen for booking success
    const handleEventScheduled = (e: any) => {
      console.log("CalendarEmbed - Booking successful, event data:", {
        event: e,
        prefillData: prefill,
        phoneNumber: formData?.phoneNumber
      });
      handleBookingSuccess();
    };

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', handleEventScheduled);

    // Cleanup function
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
  }, [calLink, handleBookingSuccess, formData]); // Only re-run when these dependencies change

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