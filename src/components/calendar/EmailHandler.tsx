import { supabase } from "@/integrations/supabase/client";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "../ui/use-toast";

interface EmailHandlerProps {
  formData?: DetailedFormData;
  analysis?: any;
  onSuccess: () => void;
}

export const useEmailHandler = ({ formData, analysis, onSuccess }: EmailHandlerProps) => {
  const { toast } = useToast();

  const sendEmails = async () => {
    if (!formData?.email || !analysis) {
      console.error('Missing required data for emails');
      return false;
    }

    try {
      const reportElement = document.getElementById("detailed-report");
      if (!reportElement) {
        console.error('Report element not found');
        return false;
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

      // Send booking confirmation
      console.log('Sending booking confirmation to:', formData.email);
      const { error: bookingEmailError } = await supabase.functions.invoke("sendemail", {
        body: {
          email: formData.email,
          companyName: formData.companyName,
          subject: `Booking Confirmation - AI Implementation Discovery Call`,
          reportHtml: `
            <h1>Booking Confirmation</h1>
            <p>Thank you for booking a discovery call with us. We look forward to discussing how we can help implement AI solutions for ${formData.companyName}.</p>
            <p>You will receive a calendar invitation shortly with the meeting details.</p>
          `
        },
      });

      if (bookingEmailError) {
        console.error('Booking email error:', bookingEmailError);
        return false;
      }

      // Send detailed report
      console.log('Sending detailed report to:', formData.email);
      const { error: reportEmailError } = await supabase.functions.invoke("sendemail", {
        body: {
          email: formData.email,
          companyName: formData.companyName,
          reportHtml: reportClone.innerHTML,
          subject: `${formData.companyName} - AI Implementation Analysis Report`
        },
      });

      if (reportEmailError) {
        console.error('Report email error:', reportEmailError);
        toast({
          title: "Error",
          description: "Failed to send the report email. Please try again later.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Booking confirmed and analysis report has been sent to your email.",
      });
      
      onSuccess();
      return true;
    } catch (error) {
      console.error('Email handling error:', error);
      toast({
        title: "Error",
        description: "An error occurred while processing your booking. Please contact support.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { sendEmails };
};