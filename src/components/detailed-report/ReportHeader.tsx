import { DetailedFormData } from "@/types/analysis";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface ReportHeaderProps {
  formData: DetailedFormData;
  onBookDemo?: () => void;
  industry?: string;
  analysis?: any;
}

export const ReportHeader = ({ formData, onBookDemo, industry, analysis }: ReportHeaderProps) => {
  const { toast } = useToast();
  
  const handleDownload = async () => {
    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your report...",
        duration: 3000,
      });

      const reportElement = document.querySelector('[data-report-content="true"]');
      if (!reportElement || !(reportElement instanceof HTMLElement)) {
        throw new Error("Report element not found");
      }

      // Create an invisible clone for PDF generation
      const clonedElement = reportElement.cloneNode(true) as HTMLElement;
      clonedElement.style.position = 'fixed';
      clonedElement.style.top = '-9999px';
      clonedElement.style.left = '-9999px';
      clonedElement.style.width = '900px';
      document.body.appendChild(clonedElement);

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      
      // Clean up
      document.body.removeChild(clonedElement);
      
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

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">AI Implementation Analysis Report</h1>
        {industry && (
          <p className="text-gray-600">Industry: {industry}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={handleDownload}
          variant="outline" 
          size="sm"
          className="bg-white hover:bg-gray-50 flex items-center gap-2 min-w-[160px]"
        >
          <Download className="h-4 w-4 text-[#f65228]" />
          Download Report
        </Button>
        {onBookDemo && (
          <Button
            onClick={onBookDemo}
            size="sm"
            className="bg-[#f65228] hover:bg-[#d43d16] text-white min-w-[120px]"
          >
            Book Demo
          </Button>
        )}
      </div>
    </div>
  );
};