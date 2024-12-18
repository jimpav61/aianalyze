import { useCalendarInitialization } from "@/hooks/useCalendarInitialization";

interface CalendarContentProps {
  calLink: string;
  onBookingSuccess: () => Promise<void>;
}

export const CalendarContent = ({ calLink, onBookingSuccess }: CalendarContentProps) => {
  useCalendarInitialization({ 
    calLink, 
    onBookingSuccess,
    isScriptLoaded: true // We know it's loaded because parent component checks
  });

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div id="cal-booking-placeholder" className="flex-1 min-h-[600px]" />
    </div>
  );
};