import { useRef, useEffect } from "react";
import { useCalendarApi } from "./calendar/useCalendarApi";
import { useCalendarConfig } from "./calendar/useCalendarConfig";
import { useCalendarCleanup } from "./calendar/useCalendarCleanup";

interface UseCalendarInitializationProps {
  calLink: string;
  onBookingSuccess: () => Promise<void>;
}

export const useCalendarInitialization = ({ 
  calLink, 
  onBookingSuccess 
}: UseCalendarInitializationProps) => {
  const mounted = useRef(true);
  const { calInitialized, calApiRef, initializeApi } = useCalendarApi();
  const { getUiConfig, getInlineConfig } = useCalendarConfig();
  
  useCalendarCleanup(mounted, calApiRef, calInitialized);

  useEffect(() => {
    const initializeCalendar = async () => {
      if (!mounted.current) {
        console.log('CalendarInit - Component unmounted, stopping initialization');
        return;
      }

      try {
        console.log('CalendarInit - Starting initialization');
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const cal = await initializeApi();

        if (calInitialized.current) {
          console.log('CalendarInit - Already initialized, skipping');
          return;
        }

        console.log('CalendarInit - Configuring UI');
        cal('ui', getUiConfig());

        await new Promise(resolve => setTimeout(resolve, 100));
        
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

    const safeInitialize = async () => {
      try {
        await initializeCalendar();
      } catch (error) {
        console.error('CalendarInit - Fatal error during initialization:', error);
        calInitialized.current = false;
      }
    };

    const timeoutId = setTimeout(safeInitialize, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig]);
};