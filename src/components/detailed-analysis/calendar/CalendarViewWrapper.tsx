import { DetailedFormData } from "@/types/analysis";
import { CalendarView } from "../CalendarView";

interface CalendarViewWrapperProps {
  onSubmit: () => void;
  formData?: DetailedFormData;
  analysis: any;
  onBookDemo: () => void;
}

export const CalendarViewWrapper = ({
  onSubmit,
  formData,
  analysis,
  onBookDemo
}: CalendarViewWrapperProps) => {
  console.log("CalendarViewWrapper - Render:", {
    hasFormData: !!formData,
    hasAnalysis: !!analysis
  });

  return (
    <>
      <CalendarView
        onSubmit={onSubmit}
        formData={formData}
        analysis={analysis}
      />
      <div className="hidden">
        {formData && analysis && (
          <div id="detailed-report">
            <h2>Analysis Report for {formData.companyName}</h2>
            {/* Add more report content as needed */}
          </div>
        )}
      </div>
    </>
  );
};
