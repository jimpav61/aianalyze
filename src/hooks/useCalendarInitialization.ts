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

    let initTimeout: NodeJS.Timeout;

    const initializeCalendar = async () => {
      try {
        console.log("CalendarInit - Initializing calendar");
        const cal = await initializeApi();
        
        if (!cal || calInitialized.current) {
          console.log("CalendarInit - Calendar already initialized or API not available");
          return;
        }

        // Small delay to ensure DOM is ready
        initTimeout = setTimeout(() => {
          if (mounted.current) {
            console.log("CalendarInit - Configuring calendar");
            cal('ui', getUiConfig());
            cal('inline', getInlineConfig(calLink));
            cal('on', {
              action: "bookingSuccessful",
              callback: onBookingSuccess,
            });

            calInitialized.current = true;
            console.log("CalendarInit - Calendar initialized successfully");
          }
        }, 100);

      } catch (error) {
        console.error('CalendarInit - Error initializing calendar:', error);
        calInitialized.current = false;
      }
    };

    initializeCalendar();

    return () => {
      clearTimeout(initTimeout);
    };
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig, isScriptLoaded]);
};