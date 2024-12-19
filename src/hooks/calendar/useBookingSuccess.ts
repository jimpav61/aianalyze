import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { CalendarFormData } from "@/types/analysis";

interface UseBookingSuccessProps {
  formData?: CalendarFormData;
  analysis?: any;
  onSubmit?: () => void;
}

export const useBookingSuccess = ({ 
  formData, 
  analysis, 
  onSubmit 
}: UseBookingSuccessProps) => {
  const { toast } = useToast();

  const handleBookingSuccess = useCallback(() => {
    console.log("Booking successful with data:", {
      formData,
      analysis
    });

    toast({
      title: "Success!",
      description: "Your demo has been scheduled. Check your email for confirmation.",
      duration: 2000, // 2 seconds
    });

    if (onSubmit) {
      onSubmit();
    }
  }, [formData, analysis, onSubmit, toast]);

  return { handleBookingSuccess };
};