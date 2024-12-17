import Cal from "@calcom/embed-react";

interface CalendarConfigProps {
  calLink: string;
}

export const CalendarConfig = ({ calLink }: CalendarConfigProps) => {
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