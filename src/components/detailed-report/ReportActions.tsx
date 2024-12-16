import { Button } from "../ui/button";
import { Download, Mail } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
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

      const canvas = await html2canvas(report);
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

      const reportHtml = report.innerHTML;

      const { data, error } = await supabase.functions.invoke("sendemail", {
        body: {
          companyName,
          email,
          reportHtml,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Report sent to your email",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
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