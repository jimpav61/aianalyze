import { useEffect } from "react";
import { useCalendarApi } from "./useCalApi";
import { useCalendarConfig } from "./useCalConfig";
import { useCalendarCleanup } from "./useCalendarCleanup";

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
  const { calInitialized, calApiRef, initializeApi } = useCalendarApi();
  const { getUiConfig, getInlineConfig } = useCalendarConfig();

  useEffect(() => {
    if (!isScriptLoaded) {
      console.log("CalendarInit - Script not loaded yet");
      return;
    }

    console.log("CalendarInit - Starting initialization process");

    const initializeCalendar = async () => {
      try {
        console.log("CalendarInit - Getting Cal API");
        const cal = await initializeApi();
        
        if (!cal) {
          console.error("CalendarInit - Failed to get Cal API");
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

        console.log("CalendarInit - Found placeholder element, clearing content");
        placeholder.innerHTML = '';
        
        console.log("CalendarInit - Configuring calendar with link:", calLink);
        
        const uiConfig = getUiConfig();
        console.log("CalendarInit - UI Config:", uiConfig);
        cal('ui', uiConfig);
        
        const inlineConfig = {
          ...getInlineConfig(calLink),
          elementOrSelector: '#cal-booking-placeholder',
        };
        console.log("CalendarInit - Inline Config:", inlineConfig);
        cal('inline', inlineConfig);

        console.log("CalendarInit - Setting up booking success callback");
        cal('on', {
          action: "bookingSuccessful",
          callback: onBookingSuccess,
        });

        calInitialized.current = true;
        console.log("CalendarInit - Calendar initialization complete");

      } catch (error) {
        console.error('CalendarInit - Error during initialization:', error);
        calInitialized.current = false;
      }
    };

    const initTimeout = setTimeout(initializeCalendar, 1000);
    console.log("CalendarInit - Set initialization timeout");

    return () => {
      clearTimeout(initTimeout);
      console.log("CalendarInit - Cleanup: cleared initialization timeout");
    };
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig, isScriptLoaded]);
};