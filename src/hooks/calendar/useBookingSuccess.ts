import { useToast } from "@/hooks/use-toast";
import { useEmailHandler } from "@/components/calendar/EmailHandler";

interface UseBookingSuccessProps {
  formData?: any;
  analysis?: any;
  onSubmit?: () => void;
}

export const useBookingSuccess = ({ formData, analysis, onSubmit }: UseBookingSuccessProps) => {
  const { toast } = useToast();
  const { sendEmails } = useEmailHandler({ 
    formData, 
    analysis, 
    onSuccess: () => {
      if (onSubmit) {
        requestAnimationFrame(onSubmit);
      }
    }
  });

  const handleBookingSuccess = async () => {
    console.log('Booking successful, sending emails');
    try {
      await sendEmails();
    } catch (error) {
      console.error('Error sending emails:', error);
      toast({
        title: 'Error',
        description: 'There was an issue completing your booking. Our team will contact you shortly.',
        variant: 'destructive',
      });
    }
  };

  return { handleBookingSuccess };
};