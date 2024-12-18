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
      try {
        // Add Cal.com embed script if not already present
        if (!document.querySelector('script[src="https://cal.com/embed.js"]')) {
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
        }

        if (!mounted) return;

        const cal = await getCalApi() as unknown as CalApi;
        
        if (!cal || calInitialized.current) {
          return;
        }

        // Initialize Cal.com
        cal.ns["bookingPage"]({
          debug: true,
          calLink: calLink,
        });

        // Add event listener for successful bookings
        cal.on({
          action: "bookingSuccessful",
          callback: async () => {
            console.log('Booking completed successfully');
            await sendEmails();
          },
        });

        calInitialized.current = true;
      } catch (error) {
        console.error('Error initializing calendar:', error);
      }
    }

    initializeCalendar();

    return () => {
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