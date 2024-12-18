import { useCalendarScript } from "@/hooks/useCalendarScript";
import { CalendarProps } from "@/types/calendar";
import { LoadingState } from "./calendar/LoadingState";
import { ErrorState } from "./calendar/ErrorState";
import { CalendarEmbed } from "./calendar/CalendarEmbed";

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  console.log("Calendar - Rendering with link:", calLink);
  
  const { isScriptLoaded, scriptError } = useCalendarScript();

  if (scriptError) {
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    console.log("Calendar - Script not loaded yet, showing loading state");
    return <LoadingState />;
  }

  console.log("Calendar - Rendering calendar placeholder");
  return (
    <CalendarEmbed 
      calLink={calLink}
      onSubmit={onSubmit}
      formData={formData}
      analysis={analysis}
    />
  );
};