import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface DownloadButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadButton = ({ formData, analysis }: DownloadButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      console.log("Toast DownloadButton - Starting download with data:", {
        hasFormData: !!formData,
        formDataContent: formData,
        hasAnalysis: !!analysis
      });

      // Find the report element in the main document
      const reportElement = document.querySelector('[data-report-content="true"]');
      if (!reportElement) {
        console.error("Toast DownloadButton - Report element not found");
        throw new Error("Report element not found");
      }

      console.log("Toast DownloadButton - Found report element with children:", reportElement.children.length);

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

      // Generate and save PDF
      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      console.log("Toast DownloadButton - About to save PDF with data:", {
        pdfGenerated: !!pdf,
        fileName,
        reportElementChildren: reportElement.children.length
      });
      
      pdf.save(fileName);
      
      console.log("Toast DownloadButton - PDF saved successfully");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 1500,
      });
    } catch (error) {
      console.error("Toast DownloadButton - Download error:", error);
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