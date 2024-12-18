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
        console.log('CalendarInit - Component unmounted, stopping initialization');
        return;
      }

      try {
        console.log('CalendarInit - Starting initialization');
        await new Promise(resolve => setTimeout(resolve, 100));
        
        cal = await getCalApi();
        if (!cal) {
          console.error('CalendarInit - Calendar API not initialized');
          throw new Error('Calendar API not initialized');
        }

        if (calInitialized.current) {
          console.log('CalendarInit - Already initialized, skipping');
          return;
        }

        console.log('CalendarInit - Configuring UI');
        cal('ui', {
          theme: 'light',
          styles: { branding: { brandColor: '#000000' } },
          hideEventTypeDetails: false,
        });

        await new Promise(resolve => setTimeout(resolve, 50));
        console.log('CalendarInit - Setting up inline calendar');

        cal('inline', {
          elementOrSelector: '#cal-booking-placeholder',
          calLink,
          config: {
            hideEventTypeDetails: false,
          }
        });

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
        throw error;
      }
    };

    console.log('CalendarInit - Setting up initialization timeout');
    const timeoutId = setTimeout(initializeCalendar, 300);

    return () => {
      console.log('CalendarInit - Cleaning up');
      mounted = false;
      clearTimeout(timeoutId);
      if (cal) {
        try {
          cal('destroy');
          console.log('CalendarInit - Calendar destroyed successfully');
        } catch (e) {
          console.error('CalendarInit - Error destroying calendar:', e);
        }
      }
      calInitialized.current = false;
    };
  }, [calLink, onBookingSuccess]);
};