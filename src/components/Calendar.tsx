import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
}

// Define a more specific type that matches the actual Cal API structure
type CalApiType = {
  on: (event: { action: string; callback: (...args: any[]) => void }) => void;
  // Add other methods as needed
} & (ReturnType<typeof getCalApi> extends Promise<infer T> ? T : never);

export const Calendar = ({ calLink, onSubmit }: CalendarProps) => {
  useEffect(() => {
    (async function initializeCalendar() {
      try {
        console.log('Initializing calendar with link:', calLink);
        const cal = (await getCalApi()) as unknown as CalApiType;
        
        if (!cal || typeof cal.on !== 'function') {
          console.error('Calendar API not properly initialized');
          return;
        }

        // Register booking event handler
        cal.on({
          action: "bookingSuccessful",
          callback: (...args) => {
            console.log('Booking completed successfully', args);
            if (onSubmit) {
              // Ensure we're running in the next animation frame
              requestAnimationFrame(() => {
                onSubmit();
              });
            }
          },
        });

        // Register error handler
        cal.on({
          action: "bookingFailed",
          callback: (error) => {
            console.error('Booking failed:', error);
          },
        });

      } catch (error) {
        console.error('Error initializing calendar:', error);
      }
    })();
  }, [onSubmit, calLink]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        hideEventTypeDetails: "false",
        isDark: "false",
        theme: "light",
      }}
    />
  );
};