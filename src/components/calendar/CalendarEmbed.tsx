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
    // Initialize Calendly widget
    const calendlyUrl = `https://calendly.com/${calLink}`;
    
    // Create prefill object with form data
    const prefill = formData ? {
      name: formData.companyName,
      email: formData.email,
      phoneNumber: formData.phoneNumber || '', // Changed from customAnswers to phoneNumber
    } : {};

    console.log("CalendarEmbed - Initializing with:", {
      url: calendlyUrl,
      prefill,
      formData
    });
    
    // @ts-ignore - Calendly types are not available
    Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: document.getElementById('calendly-booking-placeholder'),
      prefill,
      utm: {}
    });

    // Listen for booking success
    const onEventScheduled = () => {
      console.log("CalendarEmbed - Booking successful");
      handleBookingSuccess();
    };

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', onEventScheduled);

    return () => {
      // @ts-ignore - Calendly types are not available
      window.removeEventListener('calendly.event_scheduled', onEventScheduled);
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