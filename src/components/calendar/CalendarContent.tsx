import { useCalendarInitialization } from "@/hooks/useCalendarInitialization";
import { useEffect, useRef } from "react";

interface CalendarContentProps {
  calLink: string;
  onBookingSuccess: () => Promise<void>;
}

export const CalendarContent = ({ calLink, onBookingSuccess }: CalendarContentProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("CalendarContent - Mounted with placeholder:", placeholderRef.current);
  }, []);

  useCalendarInitialization({ 
    calLink, 
    onBookingSuccess,
    isScriptLoaded: true // We know it's loaded because parent component checks
  });

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        ref={placeholderRef}
        id="cal-booking-placeholder" 
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
      />
    </div>
  );
};