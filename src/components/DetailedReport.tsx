import { useEffect } from "react";
import { ReportActions } from "./detailed-report/ReportActions";
import { ReportContent } from "./detailed-report/ReportContent";
import { useReportActions } from "@/hooks/useReportActions";
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
  const {
    hasDownloaded,
    hasBooked,
    showingDownloadToast,
    handleBookDemo,
    handleDownloadComplete,
    showDownloadReminder
  } = useReportActions({ onBookDemo });

  useEffect(() => {
    console.log("DetailedReport - useEffect triggered", {
      hasBooked,
      hasDownloaded,
      showingDownloadToast
    });
    
    if (hasBooked && !hasDownloaded && !showingDownloadToast) {
      showDownloadReminder();
    }
  }, [hasBooked, hasDownloaded, showingDownloadToast, showDownloadReminder]);

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
        onDownloadComplete={handleDownloadComplete}
      />
      <ReportContent 
        data={data}
        analysis={analysis}
        analyses={analyses}
      />
    </div>
  );
};