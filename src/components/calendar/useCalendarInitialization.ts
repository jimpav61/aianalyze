import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";

interface UseCalendarInitializationProps {
  calendarRef: React.RefObject<HTMLDivElement>;
  getPrefillData: () => any;
  handleEventScheduled: (e: any) => void;
  formData?: DetailedFormData | null;
}

export const useCalendarInitialization = ({
  calendarRef,
  getPrefillData,
  handleEventScheduled,
  formData
}: UseCalendarInitializationProps) => {
  const initAttempts = useRef(0);
  const scriptLoaded = useRef(false);
  const { toast } = useToast();

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
          duration: 1500,
        });
        return;
      }

      if (!calendarRef.current) {
        console.error("Calendar reference not found");
        return;
      }

      const prefill = getPrefillData();
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

        if (!scriptLoaded.current) {
          window.addEventListener('calendly.event_scheduled', handleEventScheduled);
          scriptLoaded.current = true;
          console.log("CalendarEmbed - Calendar initialized successfully with data:", {
            prefill,
            formData
          });
        }

      } catch (error) {
        console.error("CalendarEmbed - Error initializing Calendly widget:", error);
        toast({
          title: "Error",
          description: "Failed to initialize calendar. Please try again.",
          variant: "destructive",
          duration: 1500,
        });
      }
    };

    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        console.log("CalendarEmbed - Calendly script loaded successfully");
        setTimeout(initializeCalendly, 100);
      };
      
      script.onerror = (error) => {
        console.error("Failed to load Calendly script:", error);
        toast({
          title: "Error",
          description: "Failed to load calendar. Please refresh and try again.",
          variant: "destructive",
          duration: 1500,
        });
      };
      
      document.head.appendChild(script);
    } else {
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
  }, [calendarRef, getPrefillData, handleEventScheduled, toast, formData]);
};