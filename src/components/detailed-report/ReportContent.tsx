import { Separator } from "../ui/separator";
import { ReportHeader } from "./ReportHeader";
import { CompanyInformation } from "./CompanyInformation";
import { AnalysisResults } from "./AnalysisResults";
import { CurrentOperations } from "./CurrentOperations";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportFooter } from "./ReportFooter";
import { AnalysisGrid } from "../AnalysisGrid";
import { DetailedFormData } from "@/types/analysis";

interface ReportContentProps {
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
}

export const ReportContent = ({ data, analysis, analyses }: ReportContentProps) => {
  return (
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
  );
};