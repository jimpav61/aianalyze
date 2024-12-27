import { ReportActions } from "./detailed-report/ReportActions";
import { ReportContent } from "./detailed-report/ReportContent";
import { DetailedFormData } from "@/types/analysis";

interface DetailedReportProps {
  data: DetailedFormData;
  analysis: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
    allAnalyses?: any[];
  };
  analyses: any[];
  onBookDemo?: () => void;
}

export const DetailedReport = ({ data, analysis, analyses, onBookDemo }: DetailedReportProps) => {
  if (!data || !analysis) {
    console.error("DetailedReport - Missing required data:", { data, analysis });
    return null;
  }

  console.log("DetailedReport - Rendering with data:", {
    formData: data,
    analysis,
    analyses
  });

  return (
    <div className="relative w-full bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <ReportActions 
          formData={data}
          analysis={analysis}
          onBookDemo={onBookDemo}
        />
      </div>
      <div className="mt-6">
        <ReportContent 
          formData={data}
          analysis={analysis}
          onBookDemo={onBookDemo}
        />
      </div>
    </div>
  );
};