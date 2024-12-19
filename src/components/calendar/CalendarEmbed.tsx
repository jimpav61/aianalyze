import { useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { CalendarFormData } from "@/types/analysis";
import { useCalendarEvents } from "@/hooks/calendar/useCalendarEvents";
import { useCalendarInit } from "@/hooks/calendar/useCalendarInit";

interface CalendarEmbedProps extends Omit<CalendarProps, 'formData'> {
  formData?: CalendarFormData;
}

export const CalendarEmbed = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarEmbedProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  
  const { handleBookingSuccess } = useBookingSuccess({ 
    formData, 
    analysis, 
    onSubmit 
  });

  const { handleEventScheduled } = useCalendarEvents({
    onEventScheduled: handleBookingSuccess
  });

  useCalendarInit({
    calendarRef,
    calLink,
    formData,
    onEventScheduled: handleEventScheduled
  });

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        ref={calendarRef}
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};