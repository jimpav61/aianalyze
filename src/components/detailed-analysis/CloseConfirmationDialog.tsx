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

    console.log("Download attempt - Starting with data:", {
      hasFormData: !!formData,
      formDataContent: formData,
      hasAnalysis: !!analysis,
      analysisContent: analysis
    });

    if (!formData || !analysis) {
      console.error("Download failed - Missing required data:", {
        formData,
        analysis
      });
      
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get the report element to capture
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        throw new Error("Report element not found");
      }

      console.log("Generating PDF with data:", {
        formData,
        analysis
      });
      
      const doc = await generateAnalysisReport({ formData, analysis });
      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      console.log("PDF generated successfully, attempting save as:", fileName);
      doc.save(fileName);
      console.log("PDF saved successfully");
      
      toast({
        title: "Success",
        description: (
          <div className="flex flex-col gap-2">
            <p>Report downloaded successfully!</p>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full flex items-center justify-center gap-2 mt-2"
              onClick={() => handleDownload()}
            >
              <Download className="h-4 w-4" />
              Download Again
            </Button>
          </div>
        ),
      });
    } catch (error) {
      console.error("PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
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