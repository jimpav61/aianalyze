import { DetailedFormData } from "@/types/analysis";
import { ReportHeader } from "./ReportHeader";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportFooter } from "./ReportFooter";
import { Phone } from "lucide-react";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  return (
    <div data-report-content="true" className="space-y-8 print:space-y-6 overflow-visible">
      <ReportHeader 
        formData={formData} 
        onBookDemo={onBookDemo}
        industry={analysis.industry}
        analysis={analysis}
      />
      <CompanyInformation data={formData} industry={analysis.industry} />
      <CurrentOperations data={formData} />
      <AnalysisResults 
        analyses={analysis.allAnalyses || [{
          department: analysis.department,
          function: analysis.bot_function,
          savings: analysis.savings.toString(),
          profit_increase: analysis.profit_increase.toString(),
          explanation: analysis.explanation,
          marketingStrategy: analysis.marketing_strategy
        }]}
        revenue={formData.revenue || '0'}
      />
      <ImplementationPlan data={{
        objectives: formData.objectives || '',
        timeline: formData.timeline || '',
        budget: formData.budget || '',
        additionalInfo: formData.additionalInfo
      }} />
      <div className="print:break-inside-avoid w-full print:mt-8">
        <div className="flex flex-col items-center justify-center w-full gap-4 py-8 print:py-4">
          <div className="w-full flex flex-col items-center">
            <a 
              href="tel:+14808620288"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white rounded-md bg-[#f65228] hover:bg-[#d43d16] transition-colors shadow-sm print:bg-[#f65228] print:text-white print:no-underline print:w-[200px] print:mx-auto print:text-center print:block print:py-2"
            >
              <Phone className="w-5 h-5 print:hidden" />
              <span className="print:block print:text-center">+1 (480) 862-0288</span>
            </a>
            <p className="text-sm text-gray-600 text-center mt-2">
              Talk to Our AI Implementation Expert and Test the Magic
            </p>
          </div>
        </div>
      </div>
      <ReportFooter />
    </div>
  );
};