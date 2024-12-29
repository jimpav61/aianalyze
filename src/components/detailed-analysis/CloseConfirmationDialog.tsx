import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAnalysisReport } from "@/utils/pdfGenerator";
import { DetailedFormData } from "@/types/analysis";

interface CloseConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  formData?: DetailedFormData;
  analysis?: any;
}

export const CloseConfirmationDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  formData,
  analysis
}: CloseConfirmationDialogProps) => {
  const { toast } = useToast();

  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      console.log("CloseConfirmationDialog - Download attempt starting with data:", {
        hasFormData: !!formData,
        hasAnalysis: !!analysis,
        analysisContent: analysis,
        hasAllAnalyses: !!analysis?.allAnalyses,
        analysesCount: analysis?.allAnalyses?.length || 1
      });

      if (!formData || !analysis) {
        console.error("CloseConfirmationDialog - Download failed - Missing required data");
        throw new Error("Report data not available");
      }

      // Wait a brief moment to ensure the report is rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        console.error("CloseConfirmationDialog - Report element not found in DOM");
        throw new Error("Report element not found");
      }

      console.log("CloseConfirmationDialog - Found report element, checking content:", {
        childNodes: reportElement.childNodes.length,
        cards: reportElement.getElementsByClassName('card').length,
        height: reportElement.offsetHeight,
        scrollHeight: reportElement.scrollHeight
      });

      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      console.log("CloseConfirmationDialog - Generating PDF with filename:", fileName);
      
      const pdf = await generateAnalysisReport({ formData, analysis });
      console.log("CloseConfirmationDialog - PDF generated successfully, saving file");
      
      pdf.save(fileName);
      console.log("CloseConfirmationDialog - PDF saved successfully");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 1500,
      });
    } catch (error) {
      console.error("CloseConfirmationDialog - Download error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to close?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>Don't worry, you can still access and download your analysis report after closing this window.</p>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
            Yes, close window
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};