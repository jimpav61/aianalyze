import { DetailedFormData } from "@/types/analysis";
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarEmbedWrapper } from "./calendar/CalendarEmbed";

interface CalendarViewProps {
  onSubmit: () => void;
  formData?: DetailedFormData;
  analysis: any;
  calLink?: string;
}

export const CalendarView = ({ 
  onSubmit, 
  formData, 
  analysis, 
  calLink = "jimmy-chatsites/30min"
}: CalendarViewProps) => {
  console.log("CalendarView - Render:", { hasFormData: !!formData, hasAnalysis: !!analysis });
  
  return (
    <>
      <CalendarHeader />
      <CalendarEmbedWrapper 
        calLink={calLink}
        onSubmit={onSubmit}
        formData={formData}
        analysis={analysis}
      />
    </>
  );
};