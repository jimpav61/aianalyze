import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EmailReportButtonProps {
  email?: string;
  companyName?: string;
  onComplete?: () => void;
}

export const EmailReportButton = ({ email, companyName, onComplete }: EmailReportButtonProps) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { toast } = useToast();

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

      const reportClone = report.cloneNode(true) as HTMLElement;
      
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

      const { data, error } = await supabase.functions.invoke("sendemail", {
        body: {
          email,
          companyName: companyName || 'Your Company',
          reportHtml: reportClone.innerHTML,
          subject: `${companyName || 'Your Company'} - AI Implementation Analysis Report`
        },
      });

      if (error) throw error;

      onComplete?.();
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
  );
};