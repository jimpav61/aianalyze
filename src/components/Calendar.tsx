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
    let cal: any;

    async function initializeCalendar() {
      console.log('Calendar - Starting initialization');
      
      if (!mounted) {
        console.log('Calendar - Component unmounted, stopping initialization');
        return;
      }

      try {
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
        
        // Ensure the element is mounted before initialization
        const element = document.getElementById('cal-booking-placeholder');
        if (!element) {
          console.error('Calendar - Booking placeholder not found');
          return;
        }

        cal('ui', {
          styles: { 
            branding: { brandColor: '#000000' } 
          },
          hideEventTypeDetails: false,
          layout: 'month_view'
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

    // Initialize with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeCalendar, 500);

    return () => {
      console.log('Calendar - Cleaning up');
      mounted = false;
      calInitialized.current = false;
      clearTimeout(timeoutId);
      
      // Cleanup Cal.com event listeners if initialized
      if (cal) {
        cal('destroy');
      }
    };
  }, [calLink, sendEmails]);

  return (
    <div className="w-full min-h-[600px]">
      <CalendarConfig calLink={calLink} />
      <div id="cal-booking-placeholder" className="min-h-[500px]" />
    </div>
  );
};