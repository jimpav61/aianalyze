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
    if (!isScriptLoaded || !mounted.current) {
      console.log("CalendarInit - Not ready to initialize");
      return;
    }

    const initializeCalendar = async () => {
      try {
        console.log("CalendarInit - Starting initialization");
        const cal = await initializeApi();
        
        if (!cal || calInitialized.current) {
          console.log("CalendarInit - Calendar already initialized or API not available");
          return;
        }

        // Ensure the DOM element exists
        const placeholder = document.getElementById('cal-booking-placeholder');
        if (!placeholder) {
          console.error("CalendarInit - Placeholder element not found");
          return;
        }

        // Configure calendar
        console.log("CalendarInit - Configuring calendar");
        cal('ui', getUiConfig());
        cal('inline', getInlineConfig(calLink));
        cal('on', {
          action: "bookingSuccessful",
          callback: onBookingSuccess,
        });

        calInitialized.current = true;
        console.log("CalendarInit - Calendar initialized successfully");

      } catch (error) {
        console.error('CalendarInit - Error initializing calendar:', error);
        calInitialized.current = false;
      }
    };

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(initializeCalendar, 100);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig, isScriptLoaded]);
};