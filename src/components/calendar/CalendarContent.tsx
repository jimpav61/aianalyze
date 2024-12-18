import { useEffect, useRef } from "react";

interface CalendarContentProps {
  calLink: string;
  onBookingSuccess: () => Promise<void>;
}

export const CalendarContent = ({ calLink, onBookingSuccess }: CalendarContentProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = placeholderRef.current;
    if (!element) return;

    console.log("CalendarContent - Initializing calendar with link:", calLink);
    
    // Clear any existing content
    element.innerHTML = '';
    
    // Initialize Calendly widget
    const calendlyUrl = `https://calendly.com/${calLink}`;
    
    // @ts-ignore - Calendly types are not available
    Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: element,
      prefill: {},
      utm: {}
    });

    // Listen for booking success
    const handleEventScheduled = () => {
      console.log("CalendarContent - Booking successful");
      onBookingSuccess();
    };

    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', handleEventScheduled);
    
    return () => {
      element.innerHTML = '';
      // @ts-ignore - Calendly types are not available
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
    };
  }, [calLink, onBookingSuccess]);

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        ref={placeholderRef}
        id="cal-booking-placeholder" 
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};