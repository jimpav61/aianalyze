import { useEffect } from "react";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { DetailedFormData } from "@/types/analysis";

interface CalendarEmbedProps {
  calLink?: string;
  onSubmit?: () => void;
  formData: DetailedFormData;
  analysis?: any;
}

export const CalendarEmbed = ({ onSubmit, formData, analysis }: CalendarEmbedProps) => {
  const { getPrefillData, initCalendly } = useCalendlyConfig(formData);
  const { handleEventScheduled } = useCalendlyEvents({ 
    formData, 
    onBookingSuccess: onSubmit || (() => {}) 
  });

  useEffect(() => {
    if (formData) {
      const prefill = getPrefillData();
      initCalendly(prefill);
    }
  }, [formData, getPrefillData, initCalendly]);

  return (
    <div className="calendly-embed min-h-[600px] w-full">
      <div 
        className="calendly-inline-widget w-full min-h-[600px]" 
        data-url="https://calendly.com/chatsites/demo"
      />
    </div>
  );
};