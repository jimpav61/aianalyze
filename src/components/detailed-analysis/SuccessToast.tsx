import { useToast } from "@/hooks/use-toast";

export const useSuccessToast = () => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Success",
      description: "Your demo has been scheduled successfully! A confirmation email with your detailed analysis report will be sent to your inbox shortly.",
      duration: 5000,
    });
  };

  return { showSuccessToast };
};