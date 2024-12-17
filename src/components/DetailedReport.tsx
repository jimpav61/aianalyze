import { useEffect } from "react";
import { ReportActions } from "./detailed-report/ReportActions";
import { ReportContent } from "./detailed-report/ReportContent";
import { useReportActions } from "@/hooks/useReportActions";
import { DetailedFormData } from "@/types/analysis";
import { showReportReminder } from "@/utils/toastUtils";

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
  const {
    hasDownloaded,
    hasBooked,
    hasEmailed,
    handleBookDemo,
    handleReportAction
  } = useReportActions({ onBookDemo });

  useEffect(() => {
    // Show reminder toast after a delay if no action has been taken
    const timer = setTimeout(() => {
      if (!hasDownloaded && !hasEmailed && !hasBooked) {
        showReportReminder();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasDownloaded, hasEmailed, hasBooked]);

  if (!data || !analysis) {
    console.error("DetailedReport - Missing required data:", { data, analysis });
    return null;
  }

  return (
    <div className="relative">
      <ReportActions 
        companyName={data.companyName}
        email={data.email}
        onBookDemo={handleBookDemo}
        onDownloadComplete={() => handleReportAction('download')}
        onEmailComplete={() => handleReportAction('email')}
      />
      <ReportContent 
        data={data}
        analysis={analysis}
        analyses={analyses}
      />
    </div>
  );
};