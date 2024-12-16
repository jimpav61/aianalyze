import { Separator } from "./ui/separator";
import { ReportHeader } from "./detailed-report/ReportHeader";
import { CompanyInformation } from "./detailed-report/CompanyInformation";
import { AnalysisResults } from "./detailed-report/AnalysisResults";
import { CurrentOperations } from "./detailed-report/CurrentOperations";
import { ImplementationPlan } from "./detailed-report/ImplementationPlan";
import { ReportFooter } from "./detailed-report/ReportFooter";
import { AnalysisGrid } from "./AnalysisGrid";
import { ReportActions } from "./detailed-report/ReportActions";

interface DetailedReportProps {
  data: {
    companyName: string;
    phoneNumber: string;
    email: string;
    employees: string;
    revenue: string;
    serviceChannels: string;
    monthlyInteractions: string;
    currentTools: string;
    painPoints: string;
    objectives: string;
    timeline: string;
    budget: string;
    additionalInfo: string;
  };
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
  console.log("DetailedReport - Received props:", { data, analysis, analyses });

  if (!data || !analysis || typeof analysis !== 'object') {
    console.error("DetailedReport - Missing or invalid data:", { data, analysis });
    return null;
  }

  // Validate required analysis fields
  const requiredFields = ['industry', 'department', 'bot_function', 'savings', 'profit_increase', 'explanation', 'marketing_strategy'];
  const missingFields = requiredFields.filter(field => !(field in analysis));
  
  if (missingFields.length > 0) {
    console.error("DetailedReport - Missing required analysis fields:", missingFields);
    return null;
  }

  return (
    <div className="relative">
      <ReportActions companyName={data.companyName} onBookDemo={onBookDemo} />

      <div id="detailed-report" className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <ReportHeader />
        <Separator className="mb-8" />

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          AI Implementation Analysis Report
        </h1>

        <CompanyInformation data={data} industry={analysis.industry} />
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">AI Implementation Options</h2>
          <AnalysisGrid analyses={analyses} />
        </div>

        <AnalysisResults analysis={analysis} />
        <CurrentOperations data={data} />
        <ImplementationPlan data={data} />
        <ReportFooter />
      </div>
    </div>
  );
};