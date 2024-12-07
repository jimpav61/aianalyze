import { DetailedAnalysisForm } from "../detailed-analysis/DetailedAnalysisForm";
import { DetailedReport } from "../DetailedReport";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { DetailedFormData } from "@/types/analysis";
import { DetailedAnalysisProps } from "./types";
import { useAnalysisProcessor } from "./useAnalysisProcessor";

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
  console.log("DialogContent - Render:", { showReport, formData, industry, analysis });
  
  const { getProcessedAnalysis } = useAnalysisProcessor({ industry, analysis });

  if (!showReport) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Detailed Analysis Request</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <DetailedAnalysisForm 
            onSubmit={onSubmit} 
            industry={industry}
            analysis={analysis}
          />
        </div>
      </>
    );
  }

  if (!formData) {
    console.error("DialogContent - No form data available for report");
    return null;
  }

  const processedAnalysis = getProcessedAnalysis();
  console.log("DialogContent - Processed analysis for report:", processedAnalysis);

  return (
    <DetailedReport 
      data={formData} 
      analysis={processedAnalysis}
    />
  );
};