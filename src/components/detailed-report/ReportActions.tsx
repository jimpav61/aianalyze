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

      // Set temporary styles for better PDF capture
      const originalStyle = report.style.cssText;
      report.style.maxHeight = 'none';
      report.style.overflow = 'visible';
      report.style.position = 'relative';

      const canvas = await html2canvas(report, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        windowHeight: report.scrollHeight,
        height: report.scrollHeight
      });

      // Restore original styles
      report.style.cssText = originalStyle;
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const totalPages = Math.ceil(imgHeight * ratio / pdfHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          -(page * pdfHeight),
          imgWidth * ratio,
          imgHeight * ratio,
          undefined,
          'FAST'
        );
      }

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
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1, h2, h3 {
          color: #2563eb;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        p {
          margin-bottom: 1rem;
        }
      `;
      reportClone.prepend(style);

      console.log("Sending email with report HTML:", reportClone.innerHTML);

      const { data, error } = await supabase.functions.invoke("sendemail", {
        body: {
          email,
          companyName,
          reportHtml: reportClone.innerHTML,
          subject: `${companyName} - AI Implementation Analysis Report`
        },
      });

      if (error) {
        console.error("Error from email function:", error);
        throw error;
      }

      onDownloadComplete?.();
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
        aria-label="Email Report"
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
        aria-label="Download PDF"
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
