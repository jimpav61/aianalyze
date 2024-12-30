import { useRef } from "react";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { DetailedFormData } from "@/types/analysis";
import { LoadingSpinner } from "./LoadingSpinner";
import { useCalendarInitialization } from "./useCalendarInitialization";

interface CalendarEmbedProps {
  calLink?: string;
  onSubmit?: () => void;
  formData?: DetailedFormData | null;
  analysis?: any;
}

export const CalendarEmbed = ({ onSubmit, formData = null, analysis }: CalendarEmbedProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  
  console.log("CalendarEmbed - Initializing with data:", {
    hasFormData: !!formData,
    hasAnalysis: !!analysis,
    hasOnSubmit: !!onSubmit
  });

  const { getPrefillData } = useCalendlyConfig(formData || undefined);
  const { handleEventScheduled } = useCalendlyEvents({ 
    formData: formData || undefined, 
    onBookingSuccess: onSubmit || (() => {
      console.log("CalendarEmbed - No onSubmit callback provided");
    })
  });

  useCalendarInitialization({
    calendarRef,
    getPrefillData,
    handleEventScheduled,
    formData
  });

  return (
    <div className="calendly-embed h-[calc(100vh-200px)] w-full" style={{ marginTop: '0' }}>
      <div 
        ref={calendarRef}
        className="calendly-inline-widget w-full h-full"
        style={{ minWidth: '320px' }}
      >
        <LoadingSpinner />
      </div>
    </div>
  );
};