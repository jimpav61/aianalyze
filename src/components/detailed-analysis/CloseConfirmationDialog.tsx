import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

interface CloseConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  formData?: any;
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

  const handleDownload = () => {
    console.log("Download initiated with data:", { 
      hasFormData: !!formData, 
      formDataKeys: formData ? Object.keys(formData) : [], 
      hasAnalysis: !!analysis,
      analysisKeys: analysis ? Object.keys(analysis) : []
    });

    if (!formData || !analysis) {
      console.error("Missing required data:", { formData, analysis });
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Starting PDF generation with:", {
        companyName: formData.companyName,
        industry: analysis.industry,
        savings: analysis.savings,
        profitIncrease: analysis.profit_increase
      });

      const doc = new jsPDF();
      
      // Set up PDF styling
      doc.setFont("helvetica");
      
      // Add header
      doc.setFontSize(24);
      doc.setTextColor(246, 82, 40); // #f65228
      doc.text("ChatSites AI Analysis Report", 20, 30);
      
      let yPosition = 50;

      // Company Information
      console.log("Adding company information section");
      doc.setFontSize(18);
      doc.setTextColor(0);
      doc.text("Company Information", 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      
      const companyInfo = [
        `Company Name: ${formData.companyName}`,
        `Industry: ${analysis.industry}`,
        `Contact Email: ${formData.email}`,
        `Contact Phone: ${formData.phoneNumber}`,
        `Employees: ${formData.employees}`,
        `Revenue: ${formData.revenue}`
      ];

      companyInfo.forEach(info => {
        doc.text(info, 20, yPosition);
        yPosition += 8;
      });
      yPosition += 10;

      // Current Operations
      console.log("Adding operations section");
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      doc.setFontSize(18);
      doc.text("Current Operations", 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      
      const operations = [
        `Service Channels: ${formData.serviceChannels}`,
        `Monthly Interactions: ${formData.monthlyInteractions}`,
        `Current Tools: ${formData.currentTools}`,
        `Pain Points: ${formData.painPoints}`
      ];

      operations.forEach(op => {
        const lines = doc.splitTextToSize(op, 170);
        doc.text(lines, 20, yPosition);
        yPosition += lines.length * 8;
      });
      yPosition += 10;

      // Analysis Results
      console.log("Adding analysis results section");
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      doc.setFontSize(18);
      doc.text("Analysis Results", 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);

      const results = [
        `Projected Annual Savings: $${analysis.savings.toLocaleString()}`,
        `Projected Profit Increase: ${analysis.profit_increase}%`,
        `Implementation Strategy: ${analysis.explanation}`,
        `Marketing Strategy: ${analysis.marketing_strategy}`
      ];

      results.forEach(result => {
        const lines = doc.splitTextToSize(result, 170);
        doc.text(lines, 20, yPosition);
        yPosition += lines.length * 8;
      });
      yPosition += 10;

      // Implementation Plan
      console.log("Adding implementation plan section");
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      doc.setFontSize(18);
      doc.text("Implementation Plan", 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);

      const plan = [
        `Objectives: ${formData.objectives}`,
        `Timeline: ${formData.timeline}`,
        `Budget: ${formData.budget}`,
        formData.additionalInfo ? `Additional Information: ${formData.additionalInfo}` : null
      ].filter(Boolean);

      plan.forEach(item => {
        if (item) {
          const lines = doc.splitTextToSize(item, 170);
          doc.text(lines, 20, yPosition);
          yPosition += lines.length * 8;
        }
      });

      // Add footer to each page
      console.log("Adding footers to all pages");
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(128);
        doc.text(
          `Generated by ChatSites AI - Page ${i} of ${pageCount}`,
          20,
          doc.internal.pageSize.height - 10
        );
      }
      
      console.log("PDF generation completed successfully");
      doc.save("chatsites-analysis-report.pdf");
      
      console.log("Download completed successfully");
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
      console.error("PDF generation/download error:", error);
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDownload();
              }}
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