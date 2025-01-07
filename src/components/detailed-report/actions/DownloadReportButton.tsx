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

      console.log('[DownloadReportButton] Starting download with data:', {
        hasFormData: !!formData,
        formDataContent: formData,
        hasAnalysis: !!analysis
      });

      // Wait for any pending UI updates
      await new Promise(resolve => setTimeout(resolve, 500));

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName || 'report');
      
      console.log('[DownloadReportButton] PDF generated successfully, saving as:', fileName);
      
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 1500,
      });
    } catch (error) {
      console.error('[DownloadReportButton] Download error:', error);
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