import { DetailedAnalysisForm } from "../detailed-analysis/DetailedAnalysisForm";
import { DetailedReport } from "../DetailedReport";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { DetailedFormData } from "@/types/analysis";
import { DetailedAnalysisProps } from "./types";
import { useAnalysisProcessor } from "./useAnalysisProcessor";
import { Button } from "../ui/button";

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
    <div className="space-y-6">
      <DetailedReport 
        data={formData} 
        analysis={processedAnalysis}
        analyses={[processedAnalysis]}
      />
      <div className="flex justify-center">
        <Button 
          onClick={onBookDemo}
          className="bg-[#f65228] hover:bg-[#f65228]/90 text-white"
        >
          Book a Demo with Us
        </Button>
      </div>
    </div>
  );
};