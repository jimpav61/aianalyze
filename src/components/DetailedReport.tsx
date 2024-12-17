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
    showDownloadReminder();
  }, [hasBooked, hasDownloaded, showingDownloadToast, showDownloadReminder]);

  if (!data || !analysis || typeof analysis !== 'object') {
    console.error("DetailedReport - Missing or invalid data:", { data, analysis });
    return null;
  }

  const requiredFields = ['industry', 'department', 'bot_function', 'savings', 'profit_increase', 'explanation', 'marketing_strategy'];
  const missingFields = requiredFields.filter(field => !(field in analysis));
  
  if (missingFields.length > 0) {
    console.error("DetailedReport - Missing required analysis fields:", missingFields);
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