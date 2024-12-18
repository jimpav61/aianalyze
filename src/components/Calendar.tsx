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

// Define proper types for the Cal API
type CalApi = {
  ns: {
    [key: string]: (config: { debug?: boolean; calLink: string }) => void;
  };
  on: (config: {
    action: string;
    callback: () => Promise<void>;
  }) => void;
};

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
    let scriptElement: HTMLScriptElement | null = null;

    async function initializeCalendar() {
      console.log('Calendar - Starting initialization');
      try {
        // Add Cal.com embed script if not already present
        if (!document.querySelector('script[src="https://cal.com/embed.js"]')) {
          console.log('Calendar - Adding Cal.com embed script');
          scriptElement = document.createElement('script');
          scriptElement.src = 'https://cal.com/embed.js';
          scriptElement.async = true;
          document.body.appendChild(scriptElement);

          // Wait for script to load
          await new Promise((resolve) => {
            if (scriptElement) {
              scriptElement.onload = resolve;
            }
          });
          console.log('Calendar - Embed script loaded successfully');
        }

        if (!mounted) {
          console.log('Calendar - Component unmounted, stopping initialization');
          return;
        }

        const cal = await getCalApi() as unknown as CalApi;
        
        if (!cal) {
          console.error('Calendar - Cal API not initialized');
          return;
        }

        if (calInitialized.current) {
          console.log('Calendar - Already initialized, skipping');
          return;
        }

        console.log('Calendar - Initializing Cal.com with link:', calLink);
        // Initialize Cal.com
        cal.ns["bookingPage"]({
          debug: true,
          calLink: calLink,
        });

        // Add event listener for successful bookings
        cal.on({
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

    initializeCalendar();

    return () => {
      console.log('Calendar - Cleaning up');
      mounted = false;
      calInitialized.current = false;
      // Clean up script if we added it
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [calLink, sendEmails]);

  return <CalendarConfig calLink={calLink} />;
};