import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export const Calendar = () => {
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
      calLink="chatsites/demo"
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