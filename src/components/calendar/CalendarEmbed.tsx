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
      customAnswers: {
        a1: formData.phoneNumber || 'Not provided'
      }
    } : {};

    console.log("CalendarEmbed - Initializing with prefill data:", prefill);
    
    // @ts-ignore - Calendly types are not available
    Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: document.getElementById('calendly-booking-placeholder'),
      prefill,
      utm: {}
    });

    // Listen for booking success
    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', handleBookingSuccess);

    return () => {
      // @ts-ignore - Calendly types are not available
      window.removeEventListener('calendly.event_scheduled', handleBookingSuccess);
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