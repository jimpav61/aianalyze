import { supabase } from "@/integrations/supabase/client";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

interface EmailHandlerProps {
  formData?: DetailedFormData;
  analysis?: any;
  onSuccess: () => void;
}

export const useEmailHandler = ({ formData, analysis, onSuccess }: EmailHandlerProps) => {
  const { toast } = useToast();

  const sendEmails = async () => {
    console.log("EmailHandler - Starting email send process", { 
      hasFormData: !!formData, 
      hasAnalysis: !!analysis 
    });

    if (!formData?.email || !analysis) {
      console.error('EmailHandler - Missing required data:', { 
        hasEmail: !!formData?.email, 
        hasAnalysis: !!analysis 
      });
      toast({
        title: "Error",
        description: "Unable to send confirmation emails. Please contact support.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const reportElement = document.getElementById("detailed-report");
      if (!reportElement) {
        console.error('EmailHandler - Report element not found');
        throw new Error('Report element not found');
      }

      // Clone and prepare report for email
      const reportClone = reportElement.cloneNode(true) as HTMLElement;
      const style = document.createElement('style');
      style.textContent = `
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        h1, h2 { color: #2563eb; margin-top: 1.5em; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.5rem; margin-bottom: 1.5rem; }
        .grid { display: grid; gap: 1rem; }
      `;
      reportClone.prepend(style);

      // Send booking confirmation with report included
      console.log('EmailHandler - Sending confirmation email to:', formData.email);
      const { error: emailError } = await supabase.functions.invoke("sendemail", {
        body: {
          email: formData.email,
          companyName: formData.companyName,
          subject: `Booking Confirmation - AI Implementation Discovery Call`,
          reportHtml: `
            <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #2563eb; margin-bottom: 24px;">Booking Confirmation</h1>
              <p style="margin-bottom: 16px;">Thank you for booking a discovery call with us. We look forward to discussing how we can help implement AI solutions for ${formData.companyName}.</p>
              <p style="margin-bottom: 16px;">You will receive a calendar invitation shortly with the meeting details.</p>
              <p style="margin-bottom: 24px;">We've attached your detailed analysis report below for reference.</p>
              <div style="margin-top: 32px;">
                ${reportClone.innerHTML}
              </div>
            </div>
          `
        },
      });

      if (emailError) {
        console.error('EmailHandler - Email error:', emailError);
        throw emailError;
      }

      console.log('EmailHandler - Email sent successfully');
      toast({
        title: "Success",
        description: "Booking confirmed! Check your email for details.",
      });
      
      onSuccess();
      return true;
    } catch (error) {
      console.error('EmailHandler - Error sending emails:', error);
      toast({
        title: "Error",
        description: "Failed to send confirmation email. Please contact support.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { sendEmails };
};