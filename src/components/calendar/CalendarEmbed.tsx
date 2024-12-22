import { useEffect, useRef } from "react";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

interface CalendarEmbedProps {
  calLink?: string;
  onSubmit?: () => void;
  formData: DetailedFormData;
  analysis?: any;
}

export const CalendarEmbed = ({ onSubmit, formData, analysis }: CalendarEmbedProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  console.log("CalendarEmbed - Initializing with:", {
    hasFormData: !!formData,
    formDataFields: Object.keys(formData),
    hasAnalysis: !!analysis
  });

  const { getPrefillData } = useCalendlyConfig(formData);
  const { handleEventScheduled } = useCalendlyEvents({ 
    formData, 
    onBookingSuccess: onSubmit || (() => {}) 
  });

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    
    const initializeCalendly = () => {
      if (!window.Calendly || !calendarRef.current) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initializeCalendly, 1000);
        } else {
          toast({
            title: "Error",
            description: "Failed to load calendar. Please refresh the page.",
            variant: "destructive",
          });
        }
        return;
      }

      const prefill = getPrefillData();
      console.log("CalendarEmbed - Initializing with prefill:", prefill);

      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/chatsites/demo',
        parentElement: calendarRef.current,
        prefill,
        utm: {
          utmSource: 'ChatSites',
          utmMedium: 'AI_Analysis',
          utmCampaign: 'Demo_Booking'
        }
      });

      window.addEventListener('calendly.event_scheduled', handleEventScheduled);
    };

    initializeCalendly();

    return () => {
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
      if (calendarRef.current) {
        calendarRef.current.innerHTML = '';
      }
    };
  }, [formData, getPrefillData, handleEventScheduled, toast]);

  return (
    <div className="calendly-embed min-h-[600px] w-full">
      <div 
        ref={calendarRef}
        className="calendly-inline-widget w-full min-h-[600px]"
      />
    </div>
  );
};