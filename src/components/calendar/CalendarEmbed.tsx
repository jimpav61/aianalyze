import { useEffect, useRef } from "react";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

interface CalendarEmbedProps {
  calLink?: string;
  onSubmit?: () => void;
  formData?: DetailedFormData | null;
  analysis?: any;
}

export const CalendarEmbed = ({ onSubmit, formData = null, analysis }: CalendarEmbedProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const initAttempts = useRef(0);
  const { toast } = useToast();
  
  console.log("CalendarEmbed - Initializing with:", {
    hasFormData: !!formData,
    formDataFields: formData ? Object.keys(formData) : [],
    hasAnalysis: !!analysis
  });

  const { getPrefillData } = useCalendlyConfig(formData || undefined);
  const { handleEventScheduled } = useCalendlyEvents({ 
    formData: formData || undefined, 
    onBookingSuccess: onSubmit || (() => {}) 
  });

  useEffect(() => {
    const maxAttempts = 20;
    const attemptInterval = 500; // 0.5 second between attempts

    const initializeCalendly = () => {
      if (!window.Calendly) {
        if (initAttempts.current < maxAttempts) {
          console.log(`CalendarEmbed - Attempt ${initAttempts.current + 1} to initialize Calendly`);
          initAttempts.current++;
          setTimeout(initializeCalendly, attemptInterval);
          return;
        }
        console.error("CalendarEmbed - Failed to initialize Calendly after maximum attempts");
        toast({
          title: "Error",
          description: "Failed to load calendar. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      if (!calendarRef.current) {
        console.error("Calendar reference not found");
        return;
      }

      const prefill = getPrefillData();
      console.log("CalendarEmbed - Initializing with prefill:", prefill);

      // Clear any existing widgets
      calendarRef.current.innerHTML = '';

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

    // Start initialization process
    initializeCalendly();

    return () => {
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
      if (calendarRef.current) {
        calendarRef.current.innerHTML = '';
      }
    };
  }, [formData, getPrefillData, handleEventScheduled, toast]);

  return (
    <div className="calendly-embed min-h-[700px] w-full">
      <div 
        ref={calendarRef}
        className="calendly-inline-widget w-full min-h-[700px]"
      />
    </div>
  );
};