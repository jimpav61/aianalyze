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
    hasAnalysis: !!analysis,
    industry 
  });

  if (showReport && formData && analysis) {
    console.log("DialogContent - Showing report view");
    return (
      <div className="max-h-[80vh] overflow-y-auto">
        <ReportView 
          formData={formData}
          analysis={analysis}
          industry={industry}
          onBookDemo={onBookDemo}
        />
      </div>
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