import { useEffect, useRef } from "react";
import { useCalApi } from "./useCalApi";
import { useCalConfig } from "./useCalConfig";
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
  const initAttempted = useRef(false);
  const { calInitialized, calApiRef, initializeApi } = useCalApi();
  const { getUiConfig, getInlineConfig } = useCalConfig();

  useEffect(() => {
    if (!isScriptLoaded || initAttempted.current) {
      return;
    }

    const initializeCalendar = async () => {
      try {
        initAttempted.current = true;
        const cal = await initializeApi();
        
        if (!cal) {
          return;
        }

        if (calInitialized.current) {
          return;
        }

        const placeholder = document.getElementById('cal-booking-placeholder');
        if (!placeholder) {
          return;
        }

        placeholder.innerHTML = '';
        
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

      } catch (error) {
        console.error('CalendarInit - Error initializing calendar:', error);
        calInitialized.current = false;
      }
    };

    const initTimeout = setTimeout(initializeCalendar, 1000);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, getInlineConfig, isScriptLoaded]);
};