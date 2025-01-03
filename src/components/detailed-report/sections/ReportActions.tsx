import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";
import { DetailedFormData } from "@/types/analysis";
import { useState } from "react";

interface ReportActionsProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportActions = ({ formData, analysis, onBookDemo }: ReportActionsProps) => {
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

      // Wait for the report element to be fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      // Find the report element
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        console.error("ReportActions - Report element not found");
        throw new Error("Report element not found");
      }

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      
    } catch (error) {
      console.error("ReportActions - Download error:", error);
    } finally {
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