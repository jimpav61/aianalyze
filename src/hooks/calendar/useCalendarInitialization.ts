import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCalApi } from "./useCalApi";
import { useCalConfig } from "./useCalConfig";

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
  const { toast } = useToast();
  const { calInitialized, calApiRef, initializeApi } = useCalApi();
  const { getUiConfig } = useCalConfig();

  useEffect(() => {
    if (!isScriptLoaded) {
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
        
        cal('ui', getUiConfig());
        
        cal('inline', {
          elementOrSelector: '#cal-booking-placeholder',
          calLink,
          config: {
            hideEventTypeDetails: 'false'
          }
        });

        cal('on', {
          action: "bookingSuccessful",
          callback: onBookingSuccess,
        });

        calInitialized.current = true;
        console.log("CalendarInit - Calendar initialized successfully");

      } catch (error) {
        console.error('CalendarInit - Error initializing calendar:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize calendar. Please refresh the page.',
          variant: 'destructive',
        });
      }
    };

    const initTimeout = setTimeout(initializeCalendar, 1000);
    return () => clearTimeout(initTimeout);
  }, [calLink, onBookingSuccess, initializeApi, getUiConfig, isScriptLoaded, toast]);
};