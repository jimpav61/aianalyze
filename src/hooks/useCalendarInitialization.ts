import { useRef, useEffect } from "react";
import { useCalendarApi } from "./calendar/useCalendarApi";
import { useCalendarConfig } from "./calendar/useCalendarConfig";
import { useCalendarCleanup } from "./calendar/useCalendarCleanup";

interface UseCalendarInitializationProps {
  calLink: string;
  onBookingSuccess: () => Promise<void>;
  isScriptLoaded: boolean;
}

export const useCalendarInitialization = ({ 
  calLink, 
  onBookingSuccess,
  isScriptLoaded 
}: UseCalendarInitializationProps) => {
  const mounted = useRef(true);
  const { calInitialized, calApiRef, initializeApi } = useCalendarApi();
  const { getUiConfig, getInlineConfig } = useCalendarConfig();
  
  useCalendarCleanup(mounted, calApiRef, calInitialized);

  useEffect(() => {
    if (!isScriptLoaded) return;

    const initializeCalendar = async () => {
      if (!mounted.current) return;

      try {
        const cal = await initializeApi();
        
        if (!cal || calInitialized.current) return;

        cal('ui', getUiConfig());
        cal('inline', getInlineConfig(calLink));
        cal('on', {
          action: "bookingSuccessful",
          callback: onBookingSuccess,
        });

        calInitialized.current = true;
      } catch (error) {
        console.error('CalendarInit - Error initializing calendar:', error);
        calInitialized.current = false;
      }
    };

    const timeoutId = setTimeout(initializeCalendar, 1000);
    return () => clearTimeout(timeoutId);
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig, isScriptLoaded]);
};