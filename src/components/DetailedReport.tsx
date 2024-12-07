import { Separator } from "./ui/separator";
import { ReportHeader } from "./detailed-report/ReportHeader";
import { CompanyInformation } from "./detailed-report/CompanyInformation";
import { AnalysisResults } from "./detailed-report/AnalysisResults";
import { CurrentOperations } from "./detailed-report/CurrentOperations";
import { ImplementationPlan } from "./detailed-report/ImplementationPlan";
import { ReportFooter } from "./detailed-report/ReportFooter";

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
  analysis?: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  };
}

export const DetailedReport = ({ data, analysis }: DetailedReportProps) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <ReportHeader />
      <Separator className="mb-8" />

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        AI Implementation Analysis Report
      </h1>

      <CompanyInformation data={data} industry={analysis?.industry} />
      <AnalysisResults analysis={analysis} />
      <CurrentOperations data={data} />
      <ImplementationPlan data={data} />
      <ReportFooter />
    </div>
  );
};