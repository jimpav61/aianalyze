import { useEffect, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";

interface UseCalendarInitializationProps {
  calLink: string;
  onBookingSuccess: () => Promise<void>;
}

export const useCalendarInitialization = ({ 
  calLink, 
  onBookingSuccess 
}: UseCalendarInitializationProps) => {
  const calInitialized = useRef(false);
  
  useEffect(() => {
    let mounted = true;
    let cal: any = null;

    const initializeCalendar = async () => {
      if (!mounted) {
        console.log('Calendar - Component unmounted, stopping initialization');
        return;
      }

      try {
        console.log('Calendar - Starting initialization');
        await new Promise(resolve => setTimeout(resolve, 100));
        
        cal = await getCalApi();
        if (!cal) {
          throw new Error('Calendar API not initialized');
        }

        if (calInitialized.current) {
          console.log('Calendar - Already initialized, skipping');
          return;
        }

        // Initialize UI with a clean configuration
        cal('ui', {
          theme: 'light',
          styles: { branding: { brandColor: '#000000' } },
          hideEventTypeDetails: false,
        });

        // Short delay before inline initialization
        await new Promise(resolve => setTimeout(resolve, 50));

        // Initialize inline calendar
        cal('inline', {
          elementOrSelector: '#cal-booking-placeholder',
          calLink,
          config: {
            hideEventTypeDetails: false,
          }
        });

        // Set up booking callback
        cal('on', {
          action: "bookingSuccessful",
          callback: onBookingSuccess,
        });

        calInitialized.current = true;
        console.log('Calendar - Initialization completed successfully');
      } catch (error) {
        console.error('Calendar - Error initializing calendar:', error);
        throw error;
      }
    };

    const timeoutId = setTimeout(initializeCalendar, 300);

    return () => {
      console.log('Calendar - Cleaning up');
      mounted = false;
      clearTimeout(timeoutId);
      if (cal) {
        try {
          cal('destroy');
        } catch (e) {
          console.error('Calendar - Error destroying calendar:', e);
        }
      }
      calInitialized.current = false;
    };
  }, [calLink, onBookingSuccess]);
};