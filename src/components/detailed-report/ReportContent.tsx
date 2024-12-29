import { DetailedFormData } from "@/types/analysis";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";
import { ImplementationRecommendations } from "./ImplementationRecommendations";
import { FinancialAnalysisGrid } from "./FinancialAnalysisGrid";
import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  console.log("ReportContent - Render with data:", { formData, analysis });

  if (!formData || !analysis) {
    console.error("ReportContent - Missing required data:", { formData, analysis });
    return null;
  }

  const revenue = calculateRevenue(formData.revenue);
  const financials = calculateFinancials(revenue, analysis.department, analysis.industry);

  return (
    <div id="detailed-report" className="space-y-8 print:space-y-6">
      <ReportHeader />
      <CompanyInformation data={formData} industry={analysis.industry} />
      <CurrentOperations data={formData} />
      
      <div className="implementation-recommendations mt-8">
        <h3 className="text-xl font-semibold mb-4">AI Implementation Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-700 mb-2">Primary Department</h4>
            <p className="text-[#f65228]">{analysis.department}</p>
            <h4 className="font-medium text-gray-700 mt-4 mb-2">Primary Function</h4>
            <p className="text-[#f65228]">{analysis.bot_function}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-700 mb-2">Financial Impact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Annual Savings</p>
                <p className="text-2xl font-semibold text-[#f65228]">
                  ${financials.savingsAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  ({financials.savingsPercentage}% of revenue)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Profit Increase</p>
                <p className="text-2xl font-semibold text-[#f65228]">
                  ${financials.profitAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  ({financials.profitPercentage}% increase)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Implementation Strategy</h4>
          <p className="text-[#f65228] whitespace-pre-line">{analysis.explanation}</p>
          
          <h4 className="font-medium text-gray-700 mt-6 mb-3">Marketing Strategy</h4>
          <p className="text-[#f65228] whitespace-pre-line">{analysis.marketing_strategy}</p>
        </div>

        {analysis.allAnalyses && analysis.allAnalyses.length > 1 && (
          <div className="mt-8">
            <h4 className="font-medium text-gray-700 mb-4">Additional Department Analyses</h4>
            <FinancialAnalysisGrid analysis={analysis} formData={formData} />
          </div>
        )}
      </div>

      <ImplementationPlan 
        data={{
          objectives: formData.objectives,
          timeline: formData.timeline,
          budget: formData.budget,
          additionalInfo: formData.additionalInfo
        }} 
      />
      <ReportFooter />
    </div>
  );
};