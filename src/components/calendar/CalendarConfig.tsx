import { useEffect } from "react";

interface CalendarConfigProps {
  calLink: string;
}

export const CalendarConfig = ({ calLink }: CalendarConfigProps) => {
  return (
    <div 
      data-cal-link={calLink}
      style={{ 
        minHeight: "600px", 
        width: "100%",
        marginTop: "1rem" 
      }}
    />
  );
};