import { DetailedReport } from "../DetailedReport";
import { DetailedFormData } from "@/types/analysis";

interface ReportViewProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
  industry?: string;
}

export const ReportView = ({ formData, analysis, onBookDemo, industry }: ReportViewProps) => {
  console.log("ReportView - Render:", { 
    hasFormData: !!formData, 
    hasAnalysis: !!analysis,
    industry,
    hasBookDemo: !!onBookDemo
  });

  const analysesForGrid = analysis.allAnalyses || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: analysis.savings.toString(),
    profit_increase: analysis.profit_increase.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy
  }];

  return (
    <div className="space-y-6">
      <DetailedReport 
        data={formData} 
        analysis={analysis}
        analyses={analysesForGrid}
        onBookDemo={onBookDemo}
      />
    </div>
  );
};