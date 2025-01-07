import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface DownloadReportButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadReportButton = ({ onClick, formData, analysis }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async (e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your report...",
        duration: 3000,
      });

      // Find the report element
      const reportElement = document.querySelector('[data-report-content="true"]');
      if (!reportElement || !(reportElement instanceof HTMLElement)) {
        console.error("Report element not found");
        throw new Error("Report element not found");
      }

      // Create a clone for PDF generation
      const clonedReport = reportElement.cloneNode(true) as HTMLElement;
      clonedReport.style.position = 'absolute';
      clonedReport.style.left = '-9999px';
      clonedReport.style.top = '-9999px';
      document.body.appendChild(clonedReport);

      try {
        const pdf = await generateFullReport({ formData, analysis });
        const fileName = getReportFileName(formData.companyName);
        pdf.save(fileName);

        toast({
          title: "Success",
          description: "Report downloaded successfully",
          duration: 1500,
        });
      } finally {
        // Clean up
        if (clonedReport.parentNode) {
          clonedReport.parentNode.removeChild(clonedReport);
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <Button 
      onClick={handleDownload}
      variant="outline" 
      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
    >
      <Download className="h-4 w-4 text-[#f65228]" />
      Download Report
    </Button>
  );
};