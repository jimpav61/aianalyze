import { DetailedFormData } from "@/types/analysis";
import { ReportHeader } from "./ReportHeader";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportFooter } from "./ReportFooter";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  return (
    <div data-report-content="true" className="space-y-8 print:space-y-6">
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
      <div className="flex flex-col items-center gap-4 py-8 print:py-8 print:block print:text-center">
        <Button
          data-pdf-cta="true"
          onClick={() => window.location.href = 'tel:+14808620288'}
          className="bg-[#f65228] hover:bg-[#d43d16] text-white flex items-center gap-2 px-6 py-3 print:bg-[#f65228] print:inline-flex print:mx-auto"
          style={{
            display: 'flex !important',
            alignItems: 'center !important',
            justifyContent: 'center !important',
            backgroundColor: '#f65228 !important',
            color: '#ffffff !important',
            padding: '12px 24px !important',
            borderRadius: '4px !important',
            margin: '20px auto !important',
            width: 'fit-content !important',
            fontWeight: 'bold !important',
            fontSize: '16px !important',
            opacity: '1 !important',
            visibility: 'visible !important',
            position: 'relative !important'
          }}
        >
          <Phone className="h-4 w-4" />
          +1 (480) 862-0288
        </Button>
        <p className="text-sm text-gray-600 text-center print:text-gray-600 print:mt-2">
          Talk to Our AI Implementation Expert and Test the Magic
        </p>
      </div>
      <ReportFooter />
    </div>
  );
};