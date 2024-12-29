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
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  const { toast } = useToast();
  console.log("ReportContent - Render with data:", { formData, analysis });

  if (!formData || !analysis) {
    console.error("ReportContent - Missing required data:", { formData, analysis });
    return null;
  }

  const revenue = calculateRevenue(formData.revenue);
  const financials = calculateFinancials(revenue, analysis.department, analysis.industry);

  const handleDownload = async () => {
    try {
      console.log("ReportContent - Starting download with data:", {
        formData,
        analysis,
        hasAllAnalyses: !!analysis.allAnalyses,
        analysesCount: analysis.allAnalyses?.length || 1
      });

      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      const pdf = await generateAnalysisReport({ formData, analysis });
      
      console.log("ReportContent - PDF generated successfully, saving as:", fileName);
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error("ReportContent - Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div id="detailed-report" className="space-y-8 print:space-y-6">
      <div className="flex justify-end space-x-4 mb-6">
        <Button
          onClick={onBookDemo}
          size="sm"
          className="bg-[#f65228] hover:bg-[#d43d16] text-white"
        >
          Book Demo
        </Button>
        <Button 
          onClick={handleDownload}
          variant="outline" 
          size="sm" 
          className="bg-white hover:bg-gray-50 flex items-center gap-2"
        >
          <Download className="h-4 w-4 text-[#f65228]" />
          Download Report
        </Button>
      </div>

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