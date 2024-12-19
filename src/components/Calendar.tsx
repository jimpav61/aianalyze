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
  console.log("[DEBUG] Calendar - Component Mounted", {
    hasCalLink: !!calLink,
    hasFormData: !!formData,
    hasAnalysis: !!analysis,
    formData,
    analysis
  });
  
  const { isScriptLoaded, scriptError } = useCalendarScript();

  if (scriptError) {
    console.error("[DEBUG] Calendar - Script loading error:", scriptError);
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    console.log("[DEBUG] Calendar - Waiting for script to load");
    return <LoadingState />;
  }

  console.log("[DEBUG] Calendar - Rendering CalendarEmbed");
  return (
    <CalendarEmbed 
      calLink={calLink}
      onSubmit={onSubmit}
      formData={formData}
      analysis={analysis}
    />
  );
};