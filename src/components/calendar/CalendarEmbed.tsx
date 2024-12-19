import { useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { CalendarFormData } from "@/types/analysis";
import { useCalendarInitialization } from "@/hooks/calendar/useCalendarInitialization";
import { CalendarContainer } from "./CalendarContainer";

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
  
  const { calendlyInitialized, getPrefillData } = useCalendlyConfig(formData);
  const { handleCalendlyInit, handleEventScheduled } = useCalendlyEvents({
    formData,
    onBookingSuccess: handleBookingSuccess
  });

  useCalendarInitialization({
    calendarRef,
    calendlyInitialized,
    calLink,
    getPrefillData,
    handleCalendlyInit,
    handleEventScheduled,
    formData
  });

  return (
    <div className="w-full h-[700px] flex flex-col">
      <CalendarContainer ref={calendarRef} />
    </div>
  );
};