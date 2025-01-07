import { DetailedFormData } from "@/types/analysis";
import { ReportHeader } from "./ReportHeader";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportFooter } from "./ReportFooter";
import { ReportActions } from "./ReportActions";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  const { toast } = useToast();
  
  const handleDownload = async () => {
    try {
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        console.error("Report element not found");
        throw new Error("Report element not found");
      }

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
        duration: 1500,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const analyses = analysis.allAnalyses || [{
    department: analysis.department,
    function: analysis.bot_function,
    savings: analysis.savings.toString(),
    profit_increase: analysis.profit_increase.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy
  }];

  return (
    <div data-report-content="true" className="space-y-8 print:space-y-6">
      <div className="flex justify-between items-center mb-6">
        <ReportHeader formData={formData} onBookDemo={onBookDemo} />
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
      <CompanyInformation data={formData} />
      <CurrentOperations data={formData} />
      <AnalysisResults 
        analyses={analyses}
        revenue={formData.revenue || '0'}
      />
      <ImplementationPlan data={{
        objectives: formData.objectives || '',
        timeline: formData.timeline || '',
        budget: formData.budget || '',
        additionalInfo: formData.additionalInfo
      }} />
      <ReportFooter />
    </div>
  );
};