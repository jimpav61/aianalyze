import { Calendar } from "../Calendar";
import { DetailedFormData } from "@/types/analysis";

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
  calLink = "jimmy-chatsites/30min" // Changed to use a common event type name
}: CalendarViewProps) => {
  console.log("CalendarView - Render:", { hasFormData: !!formData, hasAnalysis: !!analysis });
  
  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
        <p className="text-muted-foreground">
          Choose a time that works best for you
        </p>
      </div>
      <Calendar 
        calLink={calLink}
        onSubmit={onSubmit}
        formData={formData}
        analysis={analysis}
      />
    </>
  );
};