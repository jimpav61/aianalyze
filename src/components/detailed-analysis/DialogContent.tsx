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

  return formData ? (
    <DetailedReport 
      data={formData} 
      analysis={getProcessedAnalysis()}
    />
  ) : null;
};