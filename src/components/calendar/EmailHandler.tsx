import { useToast } from "@/hooks/use-toast";

interface UseEmailHandlerProps {
  formData?: any;
  analysis?: any;
  onSuccess?: () => void;
}

export const useEmailHandler = ({ formData, analysis, onSuccess }: UseEmailHandlerProps) => {
  const { toast } = useToast();

  const sendEmails = async () => {
    if (!formData || !analysis) {
      console.error('EmailHandler - Missing required data:', { formData, analysis });
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
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('EmailHandler - Error sending emails:', error);
      toast({
        title: "Error",
        description: "There was an issue sending the confirmation emails.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { sendEmails };
};