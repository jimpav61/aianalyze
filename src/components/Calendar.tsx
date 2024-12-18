import { useEffect, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import { DetailedFormData } from "@/types/analysis";
import { useEmailHandler } from "./calendar/EmailHandler";

interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
  formData?: DetailedFormData;
  analysis?: any;
}

export const Calendar = ({ calLink, onSubmit, formData, analysis }: CalendarProps) => {
  const { sendEmails } = useEmailHandler({ 
    formData, 
    analysis, 
    onSuccess: () => {
      console.log('Calendar - Email sent successfully, triggering onSubmit callback');
      if (onSubmit) {
        requestAnimationFrame(onSubmit);
      }
    }
  });

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
        // Wait for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        cal = await getCalApi();
        
        if (!cal) {
          console.error('Calendar - Cal API not initialized');
          return;
        }

        if (calInitialized.current) {
          console.log('Calendar - Already initialized, skipping');
          return;
        }

        console.log('Calendar - Initializing Cal.com with link:', calLink);

        // Initialize UI first
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
          calLink: calLink,
          config: {
            hideEventTypeDetails: false,
          }
        });

        // Set up booking callback
        cal('on', {
          action: "bookingSuccessful",
          callback: async () => {
            console.log('Calendar - Booking completed successfully, sending emails');
            await sendEmails();
          },
        });

        calInitialized.current = true;
        console.log('Calendar - Initialization completed successfully');
      } catch (error) {
        console.error('Calendar - Error initializing calendar:', error);
      }
    };

    // Initialize with a shorter delay
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
  }, [calLink, sendEmails]);

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div id="cal-booking-placeholder" className="flex-1 min-h-[600px]" />
    </div>
  );
};