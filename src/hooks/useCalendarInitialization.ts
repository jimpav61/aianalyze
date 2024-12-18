import { useEffect, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";

interface UseCalendarInitializationProps {
  calLink: string;
  onBookingSuccess: () => Promise<void>;
}

// Define proper types for Cal.com configuration
interface UiConfig {
  theme?: 'light' | 'dark';
  styles?: {
    branding?: {
      brandColor?: string;
    };
  };
  hideEventTypeDetails?: string;
}

interface InlineConfig {
  elementOrSelector: string;
  calLink: string;
  config?: {
    hideEventTypeDetails?: string;
  };
}

export const useCalendarInitialization = ({ 
  calLink, 
  onBookingSuccess 
}: UseCalendarInitializationProps) => {
  const calInitialized = useRef(false);
  const calApiRef = useRef<any>(null);
  
  useEffect(() => {
    let mounted = true;

    const initializeCalendar = async () => {
      if (!mounted) {
        console.log('CalendarInit - Component unmounted, stopping initialization');
        return;
      }

      try {
        console.log('CalendarInit - Starting initialization');
        
        // Add a small delay to ensure DOM is ready
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const cal = await getCalApi();
        if (!cal) {
          console.error('CalendarInit - Calendar API not initialized');
          throw new Error('Calendar API not initialized');
        }

        calApiRef.current = cal;

        if (calInitialized.current) {
          console.log('CalendarInit - Already initialized, skipping');
          return;
        }

        console.log('CalendarInit - Configuring UI');
        cal('ui', {
          theme: 'light',
          styles: { branding: { brandColor: '#000000' } },
          hideEventTypeDetails: "false",
        } satisfies UiConfig);

        // Add a small delay between UI config and inline embedding
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('CalendarInit - Setting up inline calendar');
        cal('inline', {
          elementOrSelector: '#cal-booking-placeholder',
          calLink,
          config: {
            hideEventTypeDetails: "false",
          }
        } satisfies InlineConfig);

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

    // Wrap initialization in try-catch to prevent uncaught errors
    const safeInitialize = async () => {
      try {
        await initializeCalendar();
      } catch (error) {
        console.error('CalendarInit - Fatal error during initialization:', error);
        calInitialized.current = false;
      }
    };

    console.log('CalendarInit - Setting up initialization timeout');
    const timeoutId = setTimeout(safeInitialize, 500);

    return () => {
      console.log('CalendarInit - Cleaning up');
      mounted = false;
      clearTimeout(timeoutId);
      
      if (calApiRef.current && calInitialized.current) {
        try {
          calApiRef.current('destroy');
          console.log('CalendarInit - Calendar destroyed successfully');
        } catch (e) {
          console.error('CalendarInit - Error destroying calendar:', e);
        }
      }
      calInitialized.current = false;
    };
  }, [calLink, onBookingSuccess]);
};