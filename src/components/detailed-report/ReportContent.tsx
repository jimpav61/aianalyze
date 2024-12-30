import { DetailedFormData } from "@/types/analysis";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";
import { ReportActions } from "./sections/ReportActions";
import { AnalysisOverview } from "./sections/AnalysisOverview";
import { StrategySection } from "./sections/StrategySection";
import { FinancialAnalysisGrid } from "./FinancialAnalysisGrid";

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

  return (
    <div className="space-y-8">
      {/* Action buttons outside the report content */}
      <ReportActions 
        formData={formData}
        analysis={analysis}
        onBookDemo={onBookDemo}
      />

      {/* Actual report content in a separate div */}
      <div id="detailed-report" className="space-y-8 print:space-y-6">
        <ReportHeader />
        <CompanyInformation data={formData} industry={analysis.industry} />
        <CurrentOperations data={formData} />
        
        <div className="implementation-recommendations mt-8">
          <h3 className="text-xl font-semibold mb-4">AI Implementation Analysis</h3>
          
          <AnalysisOverview analysis={analysis} formData={formData} />
          <StrategySection 
            explanation={analysis.explanation}
            marketingStrategy={analysis.marketing_strategy}
          />

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
    </div>
  );
};