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
        
        if (!(window as any).Cal) {
          console.error("CalendarInit - Cal not found in window");
          return;
        }

        const cal = await initializeApi();
        if (!cal) {
          console.error("CalendarInit - Failed to initialize Cal API");
          return;
        }

        if (calInitialized.current) {
          console.log("CalendarInit - Calendar already initialized");
          return;
        }

        // Wait for placeholder element
        const placeholder = document.getElementById('cal-booking-placeholder');
        if (!placeholder) {
          console.error("CalendarInit - Placeholder element not found");
          return;
        }

        // Clear any existing content
        placeholder.innerHTML = '';
        
        console.log("CalendarInit - Configuring calendar with link:", calLink);
        cal('ui', getUiConfig());
        cal('inline', {
          ...getInlineConfig(calLink),
          elementOrSelector: '#cal-booking-placeholder',
        });

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
    const initTimeout = setTimeout(initializeCalendar, 1000);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig, isScriptLoaded]);
};