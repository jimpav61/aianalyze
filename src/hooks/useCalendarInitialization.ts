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
        if (!cal) {
          console.error("CalendarInit - Failed to initialize Cal API");
          return;
        }

        if (calInitialized.current) {
          console.log("CalendarInit - Calendar already initialized");
          return;
        }

        const placeholder = document.getElementById('cal-booking-placeholder');
        if (!placeholder) {
          console.error("CalendarInit - Placeholder element not found");
          return;
        }

        placeholder.innerHTML = '';
        
        console.log("CalendarInit - Configuring calendar with link:", calLink);
        
        // Initialize UI first
        cal('ui', getUiConfig());
        
        // Short delay before inline initialization
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Initialize inline calendar
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

    // Increased delay to ensure DOM is ready
    const initTimeout = setTimeout(initializeCalendar, 2000);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig, isScriptLoaded]);
};