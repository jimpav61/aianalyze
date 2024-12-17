import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
}

export const Calendar = ({ calLink, onSubmit }: CalendarProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal.on({
        action: "bookingSuccessful",
        callback: () => {
          console.log('Booking completed successfully');
          if (onSubmit) {
            requestAnimationFrame(() => {
              onSubmit();
            });
          }
        },
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