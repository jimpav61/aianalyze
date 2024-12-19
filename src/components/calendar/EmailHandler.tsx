import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from 'html2canvas';

interface UseEmailHandlerProps {
  formData?: any;
  analysis?: any;
  onSuccess?: () => void;
}

export const useEmailHandler = ({ formData, analysis, onSuccess }: UseEmailHandlerProps) => {
  const { toast } = useToast();

  const sendEmails = async () => {
    console.log('EmailHandler - Starting email process with data:', { formData, analysis });
    
    if (!formData || !analysis) {
      console.error('EmailHandler - Missing required data:', { formData, analysis });
      toast({
        title: "Error",
        description: "Missing required data for email sending",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('EmailHandler - Creating report HTML');
      
      // Create a temporary div for PDF generation
      const reportDiv = document.createElement('div');
      reportDiv.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>AI Implementation Analysis Report</h1>
          <h2>Company Information</h2>
          <p>Company: ${formData.companyName || 'N/A'}</p>
          <p>Industry: ${analysis.industry || 'N/A'}</p>
          <h2>Analysis Results</h2>
          <p>Potential Savings: $${analysis.savings?.toLocaleString() || '0'}</p>
          <p>Profit Increase: ${analysis.profit_increase || '0'}%</p>
          <p>Implementation Strategy: ${analysis.marketing_strategy || 'N/A'}</p>
          <h2>Detailed Explanation</h2>
          <p>${analysis.explanation || 'N/A'}</p>
        </div>
      `;
      document.body.appendChild(reportDiv);

      console.log('EmailHandler - Starting PDF generation');
      const canvas = await html2canvas(reportDiv, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff'
      });
      
      const pdfBase64 = canvas.toDataURL('image/png');
      console.log('EmailHandler - PDF generated successfully, length:', pdfBase64.length);
      
      // Clean up
      document.body.removeChild(reportDiv);

      console.log('EmailHandler - Preparing to call sendemail function with data:', {
        hasFormData: !!formData,
        formDataEmail: formData.email,
        hasAnalysis: !!analysis,
        hasPdfData: !!pdfBase64,
        pdfLength: pdfBase64.length
      });

      const { data, error } = await supabase.functions.invoke("sendemail", {
        body: {
          formData,
          analysis,
          pdfBase64,
          subject: "Your Demo Booking Confirmation and Analysis Report"
        },
      });

      if (error) {
        console.error('EmailHandler - Supabase function error:', error);
        toast({
          title: "Error",
          description: "Failed to send email. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      console.log('EmailHandler - Email sent successfully:', data);

      toast({
        title: "Success",
        description: "Booking confirmed! Check your email for details and your analysis report.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('EmailHandler - Error:', error);
      toast({
        title: "Error",
        description: error.message || "There was an issue sending the confirmation emails.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { sendEmails };
};