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
  
  console.log("CalendarEmbed - Testing calendar initialization with:", {
    hasFormData: !!formData,
    formDataFields: formData ? Object.keys(formData) : [],
    hasAnalysis: !!analysis,
    hasCalendlyScript: typeof window !== 'undefined' && 'Calendly' in window
  });

  const { getPrefillData } = useCalendlyConfig(formData || undefined);
  const { handleEventScheduled } = useCalendlyEvents({ 
    formData: formData || undefined, 
    onBookingSuccess: onSubmit || (() => {}) 
  });

  useEffect(() => {
    const maxAttempts = 20;
    const attemptInterval = 500;

    const initializeCalendly = () => {
      if (typeof window === 'undefined' || !window.Calendly) {
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
      console.log("CalendarEmbed - Initializing Calendly with:", {
        prefill,
        elementExists: !!calendarRef.current
      });

      // Clear any existing widgets
      calendarRef.current.innerHTML = '';

      try {
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
        console.log("CalendarEmbed - Calendly widget initialized successfully");
      } catch (error) {
        console.error("CalendarEmbed - Error initializing Calendly widget:", error);
        toast({
          title: "Error",
          description: "Failed to initialize calendar. Please try again.",
          variant: "destructive",
        });
      }

      window.addEventListener('calendly.event_scheduled', handleEventScheduled);
    };

    console.log("CalendarEmbed - Starting calendar initialization process");
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
        className="calendly-inline-widget w-full min-h-[700px] flex items-center justify-center"
        style={{ minWidth: '320px' }}
      >
        <div className="text-center p-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading calendar...</p>
        </div>
      </div>
    </div>
  );
};