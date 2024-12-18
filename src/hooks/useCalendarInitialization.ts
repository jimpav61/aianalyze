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
    if (!isScriptLoaded) {
      console.log('CalendarInit - Script not loaded yet');
      return;
    }

    const initializeCalendar = async () => {
      if (!mounted.current) {
        console.log('CalendarInit - Component unmounted, stopping initialization');
        return;
      }

      try {
        console.log('CalendarInit - Starting initialization');
        
        const cal = await initializeApi();
        
        if (!cal) {
          console.error('CalendarInit - Cal API not available');
          return;
        }

        if (calInitialized.current) {
          console.log('CalendarInit - Already initialized, skipping');
          return;
        }

        console.log('CalendarInit - Configuring UI');
        cal('ui', getUiConfig());

        console.log('CalendarInit - Setting up inline calendar');
        cal('inline', getInlineConfig(calLink));

        console.log('CalendarInit - Setting up booking callback');
        cal('on', {
          action: "bookingSuccessful",
          callback: async () => {
            console.log('CalendarInit - Booking successful, triggering callback');
            try {
              await onBookingSuccess();
              console.log('CalendarInit - Booking success callback completed');
            } catch (error) {
              console.error('CalendarInit - Error in booking success callback:', error);
            }
          },
        });

        calInitialized.current = true;
        console.log('CalendarInit - Initialization completed successfully');
      } catch (error) {
        console.error('CalendarInit - Error initializing calendar:', error);
        calInitialized.current = false;
      }
    };

    // Add a small delay to ensure the script is fully loaded
    const timeoutId = setTimeout(initializeCalendar, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig, isScriptLoaded]);
};