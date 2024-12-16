import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
}

export const Calendar = ({ calLink, onSubmit }: CalendarProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal.on('bookingSuccessful', () => {
        console.log('Booking submitted successfully');
        onSubmit?.();
      });
    })();
  }, [onSubmit]);

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