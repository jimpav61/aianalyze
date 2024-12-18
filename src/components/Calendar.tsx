import { useToast } from "@/hooks/use-toast";
import { useEmailHandler } from "./calendar/EmailHandler";
import { LoadingState } from "./calendar/LoadingState";
import { ErrorState } from "./calendar/ErrorState";
import { CalendarProps } from "@/types/calendar";
import { useCalendarScript } from "@/hooks/calendar/useCalendarScript";
import { useEffect, useRef } from "react";

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  const { toast } = useToast();
  const { isScriptLoaded, scriptError } = useCalendarScript();
  const calInitialized = useRef(false);
  
  const { sendEmails } = useEmailHandler({ 
    formData, 
    analysis, 
    onSuccess: () => {
      if (onSubmit) {
        requestAnimationFrame(onSubmit);
      }
    }
  });

  useEffect(() => {
    if (!isScriptLoaded || calInitialized.current) return;

    const initializeCalendar = async () => {
      try {
        if (!window.Cal) {
          throw new Error('Calendar API not available');
        }

        // Configure UI
        window.Cal('ui', {
          theme: 'light',
          styles: { branding: { brandColor: '#2563eb' } },
          hideEventTypeDetails: false,
        });

        // Initialize inline calendar
        window.Cal('inline', {
          elementOrSelector: '#cal-booking-placeholder',
          calLink: calLink,
          config: {
            hideEventTypeDetails: 'false',
          },
        });

        // Set up booking callback
        window.Cal('on', {
          action: 'bookingSuccessful',
          callback: async () => {
            console.log('Booking successful, sending emails');
            try {
              await sendEmails();
            } catch (error) {
              console.error('Error sending emails:', error);
              toast({
                title: 'Error',
                description: 'There was an issue completing your booking. Our team will contact you shortly.',
                variant: 'destructive',
              });
            }
          },
        });

        calInitialized.current = true;
        console.log('Calendar initialized successfully');
      } catch (error) {
        console.error('Error initializing calendar:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize calendar. Please refresh the page.',
          variant: 'destructive',
        });
      }
    };

    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeCalendar, 100);
    return () => clearTimeout(timeoutId);
  }, [isScriptLoaded, calLink, sendEmails, toast]);

  if (scriptError) {
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    return <LoadingState />;
  }

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        id="cal-booking-placeholder" 
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};