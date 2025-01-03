import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";
import { DetailedFormData } from "@/types/analysis";
import { useState } from "react";

interface ReportActionsProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportActions = ({ formData, analysis, onBookDemo }: ReportActionsProps) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    try {
      setIsDownloading(true);
      console.log("ReportActions - Starting download with data:", {
        hasFormData: !!formData,
        formDataContent: formData,
        hasAnalysis: !!analysis
      });

      // Wait for any images and content to be fully loaded
      await new Promise(resolve => setTimeout(resolve, 500));

      // Find the report element
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        console.error("ReportActions - Report element not found");
        throw new Error("Report element not found");
      }

      // Temporarily hide the action buttons for PDF generation
      const actionsBar = document.querySelector('[data-report-actions]');
      if (actionsBar instanceof HTMLElement) {
        actionsBar.style.visibility = 'hidden';
      }

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 1500,
      });
    } catch (error) {
      console.error("ReportActions - Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      // Restore the action buttons visibility
      const actionsBar = document.querySelector('[data-report-actions]');
      if (actionsBar instanceof HTMLElement) {
        actionsBar.style.visibility = 'visible';
      }
      setIsDownloading(false);
    }
  };

  return (
    <div 
      data-report-actions 
      className="sticky top-0 z-50 flex justify-end gap-4 bg-white py-4 px-6 border-b shadow-sm w-full print:hidden"
    >
      <Button
        onClick={onBookDemo}
        size="sm"
        className="min-w-[120px] bg-[#f65228] hover:bg-[#d43d16] text-white"
      >
        Book Demo
      </Button>
      <Button 
        onClick={handleDownload}
        disabled={isDownloading}
        variant="outline" 
        size="sm" 
        className="min-w-[160px] bg-white hover:bg-gray-50 flex items-center gap-2"
      >
        <Download className="h-4 w-4 text-[#f65228]" />
        {isDownloading ? 'Downloading...' : 'Download Report'}
      </Button>
    </div>
  );
};