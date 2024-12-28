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
  console.log("DetailedReport - Testing data flow:", {
    formData: data,
    analysis,
    analyses,
    hasBookDemo: !!onBookDemo,
    clientInfo: {
      companyName: data?.companyName,
      ownerName: data?.ownerName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      employees: data?.employees,
      revenue: data?.revenue
    }
  });

  if (!data || !analysis) {
    console.error("DetailedReport - Missing required data:", { data, analysis });
    return null;
  }

  // Process analyses with form data
  const processedAnalyses = analysis.allAnalyses || analyses || [analysis];
  const primaryAnalysis = {
    ...analysis,
    allAnalyses: processedAnalyses,
    formData: data,
    industry: analysis.industry || data.industry
  };

  console.log("DetailedReport - Processed analysis for rendering:", primaryAnalysis);

  return (
    <div 
      id="detailed-report" 
      className="relative w-full bg-white p-8 rounded-lg shadow-sm"
    >
      <div className="mb-6">
        <ReportActions 
          formData={data}
          analysis={primaryAnalysis}
          onBookDemo={onBookDemo}
        />
      </div>
      <div className="mt-6">
        <ReportContent 
          formData={data}
          analysis={primaryAnalysis}
          onBookDemo={onBookDemo}
        />
      </div>
    </div>
  );
};