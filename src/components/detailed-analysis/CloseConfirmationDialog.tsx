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

  const handleDownload = async () => {
    try {
      console.log("ReportActions - Starting download with data:", {
        formData,
        analysis
      });

      const pdf = await generateAnalysisReport({ formData, analysis });
      const fileName = `AI_Analysis_Report_${formData?.companyName}_${new Date().toISOString().split('T')[0]}.pdf`;
      console.log("ReportActions - Generated PDF, attempting to save as:", fileName);
      
      pdf.save(fileName);
      
      console.log("ReportActions - PDF saved successfully");
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
      console.error("ReportActions - Download error:", error);
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