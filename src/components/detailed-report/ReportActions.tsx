import { Button } from "../ui/button";
import { Download, Mail } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReportActionsProps {
  companyName: string;
  email?: string;
  onBookDemo?: () => void;
  onDownloadComplete?: () => void;
}

export const ReportActions = ({ 
  companyName, 
  email,
  onBookDemo, 
  onDownloadComplete 
}: ReportActionsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const report = document.getElementById("detailed-report");
      if (!report) {
        throw new Error("Report element not found");
      }

      const canvas = await html2canvas(report, {
        scale: 2, // Increase quality
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff'
      });
      
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${companyName}-AI-Implementation-Analysis.pdf`);
      
      onDownloadComplete?.();
      toast({
        title: "Success",
        description: "Report downloaded successfully",
      });
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "No email address provided",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const report = document.getElementById("detailed-report");
      if (!report) {
        throw new Error("Report element not found");
      }

      // Create a clean copy of the report for email
      const reportClone = report.cloneNode(true) as HTMLElement;
      
      // Add inline styles for email compatibility
      const style = document.createElement('style');
      style.textContent = `
        .detailed-report {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .report-section {
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 8px;
          background-color: #f8f9fa;
        }
        h1, h2, h3 {
          color: #333;
          margin-bottom: 15px;
        }
        p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 10px;
        }
      `;
      reportClone.prepend(style);

      console.log("Sending email with report HTML:", reportClone.innerHTML);

      const { data, error } = await supabase.functions.invoke("sendemail", {
        body: {
          companyName,
          email,
          reportHtml: reportClone.innerHTML,
          subject: `${companyName} - AI Implementation Analysis Report`
        },
      });

      if (error) {
        console.error("Error from email function:", error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Report sent to your email. Please check your inbox (and spam folder).",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try downloading the PDF instead.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 flex justify-end gap-4 bg-white p-4 shadow-md">
      <Button
        variant="outline"
        onClick={handleSendEmail}
        disabled={isSendingEmail || !email}
      >
        {isSendingEmail ? (
          "Sending..."
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Email Report
          </>
        )}
      </Button>
      <Button
        variant="outline"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          "Downloading..."
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </>
        )}
      </Button>
      <Button onClick={onBookDemo}>Book a Demo</Button>
    </div>
  );
};