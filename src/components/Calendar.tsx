import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalendarProps {
  calLink?: string;
}

export const Calendar = ({ calLink = "chatsites/demo" }: CalendarProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      // Check if cal exists and has namespace method before calling it
      if (cal && 'namespace' in cal && typeof cal.namespace === 'function') {
        cal.namespace({
          "hide-branding": "1",
          "hide-gdpr-banner": "1",
        });
      }
    })();
  }, []);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
      config={{
        layout: "month_view",
        hideEventTypeDetails: "1",
        hideLandingPageDetails: "1",
        theme: "light",
      }}
    />
  );
};