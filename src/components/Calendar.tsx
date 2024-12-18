import { useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { useCalendarScript } from "@/hooks/calendar/useCalendarScript";
import { useCalCleanup } from "@/hooks/calendar/useCalCleanup";
import { useCalApi } from "@/hooks/calendar/useCalApi";
import { LoadingState } from "./calendar/LoadingState";
import { ErrorState } from "./calendar/ErrorState";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { useCalendarInitialization } from "@/hooks/calendar/useCalendarInitialization";

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  const { isScriptLoaded, scriptError } = useCalendarScript();
  const mounted = useRef(true);
  const { calInitialized, calApiRef } = useCalApi();
  
  useCalCleanup(mounted, calApiRef, calInitialized);
  
  const { handleBookingSuccess } = useBookingSuccess({ 
    formData, 
    analysis, 
    onSubmit 
  });

  useCalendarInitialization({ 
    calLink, 
    onBookingSuccess: handleBookingSuccess,
    isScriptLoaded
  });

  if (scriptError) {
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    return <LoadingState />;
  }

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        id="cal-booking-placeholder" 
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};