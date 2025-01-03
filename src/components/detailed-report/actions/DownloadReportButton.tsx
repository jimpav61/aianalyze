import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface DownloadReportButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadReportButton = ({ formData, analysis }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      // Find the report element
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        console.error("Report element not found");
        throw new Error("Report element not found");
      }

      // Temporarily hide the action buttons for PDF generation
      const actionsBar = document.querySelector('[data-report-actions]');
      if (actionsBar instanceof HTMLElement) {
        actionsBar.style.visibility = 'hidden';
      }

      // Set all elements to be visible and wait for rendering
      const elementsToShow = reportElement.querySelectorAll('*');
      elementsToShow.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.visibility = 'visible';
          element.style.display = element.style.display === 'none' ? 'block' : element.style.display;
        }
      });

      // Wait for content to be fully rendered
      await new Promise(resolve => setTimeout(resolve, 3000));

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 1500,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      // Restore the action buttons visibility
      const actionsBar = document.querySelector('[data-report-actions]');
      if (actionsBar instanceof HTMLElement) {
        actionsBar.style.visibility = 'visible';
      }
    }
  };

  return (
    <Button onClick={handleDownload} variant="outline" size="sm" className="bg-white hover:bg-gray-50">
      <Download className="mr-2 h-4 w-4 text-[#9b87f5]" />
      Download Report
    </Button>
  );
};