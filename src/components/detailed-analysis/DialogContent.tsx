import { FormView } from "./FormView";
import { ReportView } from "./ReportView";
import { DetailedFormData } from "@/types/analysis";
import { DetailedAnalysisProps } from "./types";

interface DialogContentProps extends Pick<DetailedAnalysisProps, 'industry' | 'analysis'> {
  showReport: boolean;
  formData: DetailedFormData | null;
  onSubmit: (data: DetailedFormData) => void;
  onBookDemo: () => void;
}

export const DialogContent = ({ 
  showReport, 
  formData, 
  onSubmit, 
  industry, 
  analysis,
  onBookDemo
}: DialogContentProps) => {
  console.log("DialogContent - Render state:", { 
    showReport, 
    hasFormData: !!formData, 
    formDataContent: formData,
    hasAnalysis: !!analysis,
    industry,
    analysisData: analysis
  });

  if (showReport && formData) {
    console.log("DialogContent - Showing report view with complete data:", {
      formData,
      analysis
    });
    
    return (
      <ReportView 
        formData={formData}
        analysis={analysis}
        onBookDemo={onBookDemo}
        industry={industry}
      />
    );
  }

  console.log("DialogContent - Showing form view");
  return (
    <FormView 
      onSubmit={onSubmit}
      industry={industry}
      analysis={analysis}
      initialData={formData}
    />
  );
};