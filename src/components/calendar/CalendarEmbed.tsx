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
  const scriptLoaded = useRef(false);
  const { toast } = useToast();
  
  const { getPrefillData } = useCalendlyConfig(formData || undefined);
  const { handleEventScheduled } = useCalendlyEvents({ 
    formData: formData || undefined, 
    onBookingSuccess: onSubmit || (() => {}) 
  });

  useEffect(() => {
    const maxAttempts = 20;
    const attemptInterval = 500;
    let timeoutId: NodeJS.Timeout;

    const initializeCalendly = () => {
      if (typeof window === 'undefined' || !window.Calendly) {
        if (initAttempts.current < maxAttempts) {
          console.log(`CalendarEmbed - Attempt ${initAttempts.current + 1} to initialize Calendly`);
          initAttempts.current++;
          timeoutId = setTimeout(initializeCalendly, attemptInterval);
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

      // Clear any existing widgets
      calendarRef.current.innerHTML = '';

      try {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/jimmy-chatsites/30min',
          parentElement: calendarRef.current,
          prefill,
          utm: {
            utmSource: 'ChatSites',
            utmMedium: 'AI_Analysis',
            utmCampaign: 'Demo_Booking'
          }
        });

        // Add event listener only once
        if (!scriptLoaded.current) {
          window.addEventListener('calendly.event_scheduled', handleEventScheduled);
          scriptLoaded.current = true;
        }

      } catch (error) {
        console.error("CalendarEmbed - Error initializing Calendly widget:", error);
        toast({
          title: "Error",
          description: "Failed to initialize calendar. Please try again.",
          variant: "destructive",
        });
      }
    };

    // Load Calendly script if not already present
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.defer = true; // Add defer to ensure proper loading
      script.crossOrigin = "anonymous";
      
      // Add load event listener to track when script is loaded
      script.onload = () => {
        console.log("CalendarEmbed - Calendly script loaded successfully");
        // Wait a brief moment before initializing to ensure everything is ready
        setTimeout(initializeCalendly, 100);
      };
      
      script.onerror = (error) => {
        console.error("Failed to load Calendly script:", error);
        toast({
          title: "Error",
          description: "Failed to load calendar. Please refresh and try again.",
          variant: "destructive",
        });
      };
      
      document.head.appendChild(script);
    } else {
      // If script already exists, just initialize after a brief delay
      setTimeout(initializeCalendly, 100);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (scriptLoaded.current) {
        window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
        scriptLoaded.current = false;
      }
      if (calendarRef.current) {
        calendarRef.current.innerHTML = '';
      }
    };
  }, [getPrefillData, handleEventScheduled, toast]);

  return (
    <div className="calendly-embed h-[calc(100vh-200px)] w-full" style={{ marginTop: '-66px' }}>
      <div 
        ref={calendarRef}
        className="calendly-inline-widget w-full h-full"
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