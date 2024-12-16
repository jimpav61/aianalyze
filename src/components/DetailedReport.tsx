import { Separator } from "./ui/separator";
import { ReportHeader } from "./detailed-report/ReportHeader";
import { CompanyInformation } from "./detailed-report/CompanyInformation";
import { AnalysisResults } from "./detailed-report/AnalysisResults";
import { CurrentOperations } from "./detailed-report/CurrentOperations";
import { ImplementationPlan } from "./detailed-report/ImplementationPlan";
import { ReportFooter } from "./detailed-report/ReportFooter";
import { Button } from "./ui/button";
import { Download, CalendarDays } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "./ui/use-toast";
import { AnalysisGrid } from "./AnalysisGrid";

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
  const { toast } = useToast();
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

  const handleDownloadPDF = async () => {
    const element = document.getElementById('detailed-report');
    if (!element) return;

    toast({
      title: "Generating PDF",
      description: "Please wait while we prepare your report...",
    });

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${data.companyName}-AI-Implementation-Analysis.pdf`);

      toast({
        title: "Success",
        description: "Your report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white pb-4 mb-4 flex justify-end gap-4">
        <Button
          onClick={onBookDemo}
          className="gap-2"
          variant="outline"
        >
          <CalendarDays className="w-4 h-4" />
          Book A Demo
        </Button>
        <Button
          onClick={handleDownloadPDF}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

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