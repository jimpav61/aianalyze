import { useEffect } from "react";

interface CalendarConfigProps {
  calLink: string;
}

export const CalendarConfig = ({ calLink }: CalendarConfigProps) => {
  useEffect(() => {
    // Add Cal.com embed script if not already present
    const script = document.createElement('script');
    script.src = 'https://cal.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      data-cal-link={calLink}
      style={{ minHeight: "600px", width: "100%" }}
    />
  );
};