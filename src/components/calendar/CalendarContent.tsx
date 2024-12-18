import { useCalendarInitialization } from "@/hooks/useCalendarInitialization";
import { useEffect, useRef } from "react";

interface CalendarContentProps {
  calLink: string;
  onBookingSuccess: () => Promise<void>;
}

export const CalendarContent = ({ calLink, onBookingSuccess }: CalendarContentProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = placeholderRef.current;
    if (element) {
      console.log("CalendarContent - Placeholder mounted and ready");
      element.innerHTML = ''; // Clear any existing content
    }
  }, []);

  useCalendarInitialization({ 
    calLink, 
    onBookingSuccess,
    isScriptLoaded: true
  });

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