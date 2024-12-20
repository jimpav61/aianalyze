import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { CalendarFormData } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";

interface UseBookingSuccessProps {
  formData?: CalendarFormData;
  analysis?: any;
  onSubmit?: () => void;
}

export const useBookingSuccess = ({ 
  formData, 
  analysis, 
  onSubmit 
}: UseBookingSuccessProps) => {
  const { toast } = useToast();

  const handleDownload = useCallback(() => {
    if (!formData || !analysis) {
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const doc = new jsPDF();
      
      // Set up PDF styling
      doc.setFont("helvetica");
      
      // Add header
      doc.setFontSize(24);
      doc.setTextColor(246, 82, 40); // #f65228
      doc.text("ChatSites AI Analysis Report", 20, 30);
      
      let yPosition = 50;

      // Company Information
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

      // Save the PDF directly
      doc.save("chatsites-analysis-report.pdf");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  }, [formData, analysis, toast]);

  const handleBookingSuccess = useCallback(() => {
    console.log("Booking successful with data:", {
      formData,
      analysis
    });

    toast({
      title: "Success!",
      description: (
        <div className="space-y-2">
          <p>Your demo has been scheduled. Check your email for confirmation.</p>
          <Button 
            onClick={handleDownload}
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      ),
      duration: 5000,
    });

    if (onSubmit) {
      onSubmit();
    }
  }, [formData, analysis, onSubmit, toast, handleDownload]);

  return { handleBookingSuccess };
};