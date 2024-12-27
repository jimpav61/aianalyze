import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DetailedFormData } from "@/types/analysis";

interface EmailHandlerProps {
  formData?: DetailedFormData;
  analysis?: any;
  onSuccess?: () => void;
}

export const useEmailHandler = ({ formData, analysis, onSuccess }: EmailHandlerProps) => {
  const { toast } = useToast();

  const sendEmails = async () => {
    console.log('EmailHandler - Attempting to send emails with data:', {
      formData,
      analysis
    });

    if (!formData?.email) {
      console.error('EmailHandler - Missing email address');
      toast({
        title: "Error",
        description: "Email address is required.",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    try {
      const response = await fetch('/api/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          analysis,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send emails');
      }

      toast({
        title: "Success",
        description: "Booking confirmed! Check your email for details.",
        duration: 1500,
      });

      // Call success callback without refreshing
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error('EmailHandler - Error sending emails:', error);
      toast({
        title: "Error",
        description: "There was an issue sending the confirmation emails.",
        variant: "destructive",
        duration: 1500,
      });
      throw error;
    }
  };

  return { sendEmails };
};