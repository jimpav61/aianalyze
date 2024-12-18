import { useEffect } from "react";
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
    const prefill = formData ? {
      name: formData.companyName,
      email: formData.email,
      phone: formData.phoneNumber || '' // Using Calendly's standard phone field
    } : {};

    console.log("CalendarEmbed - Initializing with:", {
      url: calendlyUrl,
      prefill,
      formData
    });
    
    // @ts-ignore - Calendly types are not available
    Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: element,
      prefill,
      utm: {}
    });

    // Listen for booking success
    const handleEventScheduled = () => {
      console.log("CalendarEmbed - Booking successful");
      handleBookingSuccess();
    };

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', handleEventScheduled);

    return () => {
      element.innerHTML = '';
      // @ts-ignore - Calendly types are not available
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
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