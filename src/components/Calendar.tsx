import { useCalendarScript } from "@/hooks/useCalendarScript";
import { CalendarProps } from "@/types/calendar";
import { LoadingState } from "./calendar/LoadingState";
import { ErrorState } from "./calendar/ErrorState";
import { CalendarEmbed } from "./calendar/CalendarEmbed";
import { DetailedFormData } from "@/types/analysis";

interface ExtendedCalendarProps extends CalendarProps {
  formData: DetailedFormData;
}

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: ExtendedCalendarProps) => {
  console.log("Calendar - Rendering with link:", calLink);
  console.log("Calendar - Form data:", formData);
  
  const { isScriptLoaded, scriptError } = useCalendarScript();

  if (scriptError) {
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    console.log("Calendar - Script not loaded yet, showing loading state");
    return <LoadingState />;
  }

  return (
    <CalendarEmbed 
      calLink={calLink}
      onSubmit={onSubmit}
      formData={formData}
      analysis={analysis}
    />
  );
};