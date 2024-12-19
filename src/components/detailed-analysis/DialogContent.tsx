import { FormView } from "./FormView";
import { ReportView } from "./ReportView";
import { DetailedFormData } from "@/types/analysis";
import { DetailedAnalysisProps } from "./types";

interface DialogContentProps extends Pick<DetailedAnalysisProps, 'industry' | 'analysis'> {
  showReport: boolean;
  formData: DetailedFormData | null;
  onSubmit: (data: DetailedFormData) => void;
}

export const DialogContent = ({ 
  showReport, 
  formData, 
  onSubmit, 
  industry, 
  analysis
}: DialogContentProps) => {
  console.log("DialogContent - Render state:", { 
    showReport, 
    hasFormData: !!formData, 
    hasAnalysis: !!analysis,
    industry 
  });

  if (showReport && formData && analysis) {
    console.log("DialogContent - Showing report view");
    return (
      <ReportView 
        formData={formData}
        analysis={analysis}
        industry={industry}
        onBookDemo={() => {
          if (!formData) {
            console.error("DialogContent - No form data available for booking");
            return false;
          }
          console.log("DialogContent - Book demo clicked with form data:", formData);
          return true;
        }}
      />
    );
  }

  console.log("DialogContent - Showing form view");
  return (
    <FormView 
      onSubmit={onSubmit}
      industry={industry}
      analysis={analysis}
    />
  );
};