import { DetailedReport } from "../DetailedReport";
import { DetailedFormData } from "@/types/analysis";
import { useAnalysisProcessor } from "./useAnalysisProcessor";

interface ReportViewProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo: () => void;
  industry?: string;
}

export const ReportView = ({ formData, analysis, onBookDemo, industry }: ReportViewProps) => {
  const { getProcessedAnalysis } = useAnalysisProcessor({ industry, analysis });
  
  console.log("ReportView - Render:", { 
    hasFormData: !!formData, 
    hasAnalysis: !!analysis,
    industry 
  });

  const processedAnalysis = getProcessedAnalysis();

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