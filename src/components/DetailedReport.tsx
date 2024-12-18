import { useRef } from "react";
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
  };
  analyses: any[];
  onBookDemo?: () => void;
}

export const DetailedReport = ({ data, analysis, analyses, onBookDemo }: DetailedReportProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  if (!data || !analysis) {
    console.error("DetailedReport - Missing required data:", { data, analysis });
    return null;
  }

  return (
    <div className="relative">
      <div ref={reportRef}>
        <ReportContent 
          formData={data}
          analysis={analysis}
          onBookDemo={onBookDemo}
        />
      </div>
      <div className="mt-6">
        <ReportActions 
          reportRef={reportRef}
          onBookDemo={onBookDemo}
        />
      </div>
    </div>
  );
};