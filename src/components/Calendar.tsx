import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
}

export const Calendar = ({ calLink, onSubmit }: CalendarProps) => {
  const { toast } = useToast();

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        
        if (!cal) {
          console.error('Failed to initialize Cal API');
          toast({
            title: "Error",
            description: "Failed to initialize calendar. Please try again.",
            variant: "destructive",
          });
          return;
        }

        console.log('Cal API initialized successfully');
        
        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            console.log('Booking submitted successfully');
            onSubmit?.();
          },
        });

        // Also handle booking failed events
        cal("on", {
          action: "bookingFailed",
          callback: (error: any) => {
            console.error('Booking failed:', error);
            toast({
              title: "Booking Failed",
              description: "There was an error processing your booking. Please try again.",
              variant: "destructive",
            });
          },
        });
      } catch (error) {
        console.error('Error initializing Cal API:', error);
        toast({
          title: "Calendar Error",
          description: "Failed to load the calendar. Please refresh the page.",
          variant: "destructive",
        });
      }
    })();
  }, [onSubmit, toast]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
      }}
    />
  );
};