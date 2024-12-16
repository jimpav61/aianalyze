import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export const Calendar = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal.namespace({
        "hide-branding": true,
        "hide-gdpr-banner": true,
      });
    })();
  }, []);

  return (
    <Cal
      calLink="your-organization/demo"
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
      config={{
        layout: "month_view",
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        theme: "light",
      }}
    />
  );
};