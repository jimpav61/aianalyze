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

  if (!formData || !analysis) {
    console.error("DialogContent - Missing required data for report:", { formData, analysis });
    return null;
  }

  const processedAnalysis = getProcessedAnalysis();
  console.log("DialogContent - Processed analysis for report:", processedAnalysis);

  // Use all analyses from the analysis object if available
  const analysesForGrid = analysis.allAnalyses || [{
    id: crypto.randomUUID(),
    department: processedAnalysis.department,
    function: processedAnalysis.bot_function,
    savings: processedAnalysis.savings.toString(),
    profit_increase: processedAnalysis.profit_increase.toString(),
    explanation: processedAnalysis.explanation,
    marketingStrategy: processedAnalysis.marketing_strategy
  }];

  return (
    <div className="space-y-6">
      <DetailedReport 
        data={formData} 
        analysis={processedAnalysis}
        analyses={analysesForGrid}
        onBookDemo={onBookDemo}
      />
    </div>
  );
};