import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export const Calendar = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      // Using type assertion to handle the Cal API types
      if (cal && 'namespace' in cal) {
        cal.namespace({
          "hide-branding": "1",
          "hide-gdpr-banner": "1",
        });
      }
    })();
  }, []);

  return (
    <Cal
      calLink="your-organization/demo"
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