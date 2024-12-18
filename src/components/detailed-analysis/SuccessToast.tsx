import { useToast } from "@/hooks/use-toast";

export const useSuccessToast = () => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Success",
      description: "Your demo has been scheduled successfully! A confirmation email with your detailed analysis report will be sent to your inbox shortly.",
      duration: 1500, // Changed to 1.5 seconds to match the removal delay
    });
  };

  return { showSuccessToast };
};