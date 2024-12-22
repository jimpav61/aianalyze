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
  console.log("CalendarEmbed - Initializing with:", {
    hasFormData: !!formData,
    formDataFields: Object.keys(formData),
    hasAnalysis: !!analysis
  });

  const { getPrefillData, initCalendly } = useCalendlyConfig(formData);
  const { handleEventScheduled } = useCalendlyEvents({ 
    formData, 
    onBookingSuccess: onSubmit || (() => {}) 
  });

  useEffect(() => {
    const setupCalendly = () => {
      if (formData && window.Calendly) {
        console.log("CalendarEmbed - Setting up Calendly with form data");
        const prefill = getPrefillData();
        console.log("CalendarEmbed - Prefill data:", prefill);
        initCalendly(prefill);
      }
    };

    // Initial setup
    setupCalendly();

    // Retry setup if Calendly isn't loaded yet
    const retryInterval = setInterval(() => {
      if (window.Calendly) {
        setupCalendly();
        clearInterval(retryInterval);
      }
    }, 1000);

    return () => {
      clearInterval(retryInterval);
    };
  }, [formData, getPrefillData, initCalendly]);

  useEffect(() => {
    console.log("CalendarEmbed - Setting up event listeners");
    window.addEventListener('calendly.event_scheduled', handleEventScheduled);
    
    return () => {
      console.log("CalendarEmbed - Cleaning up event listeners");
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
    };
  }, [handleEventScheduled]);

  return (
    <div className="calendly-embed min-h-[600px] w-full">
      <div 
        className="calendly-inline-widget w-full min-h-[600px]" 
        data-url="https://calendly.com/chatsites/demo"
      />
    </div>
  );
};