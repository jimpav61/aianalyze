import { useEffect, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import { DetailedFormData } from "@/types/analysis";
import { CalendarConfig } from "./calendar/CalendarConfig";
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

    async function initializeCalendar() {
      console.log('Calendar - Starting initialization');
      
      if (!mounted) {
        console.log('Calendar - Component unmounted, stopping initialization');
        return;
      }

      try {
        const cal = await getCalApi();
        
        if (!cal) {
          console.error('Calendar - Cal API not initialized');
          return;
        }

        if (calInitialized.current) {
          console.log('Calendar - Already initialized, skipping');
          return;
        }

        console.log('Calendar - Initializing Cal.com with link:', calLink);

        cal('inline', {
          elementOrSelector: '#cal-booking-placeholder',
          calLink: calLink,
          config: {
            hideEventTypeDetails: 'false',
            layout: 'month_view',
            styles: JSON.stringify({ 
              branding: { brandColor: '#000000' } 
            })
          }
        });

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
    }

    // Initialize with a longer delay to ensure DOM and scripts are ready
    const timeoutId = setTimeout(initializeCalendar, 2000);

    return () => {
      console.log('Calendar - Cleaning up');
      mounted = false;
      calInitialized.current = false;
      clearTimeout(timeoutId);
    };
  }, [calLink, sendEmails]);

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div id="cal-booking-placeholder" className="flex-1 min-h-[600px]" />
    </div>
  );
};