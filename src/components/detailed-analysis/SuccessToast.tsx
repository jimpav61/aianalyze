import { useToast } from "@/hooks/use-toast";

export const useSuccessToast = () => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Success",
      description: "Your demo has been scheduled successfully!",
      duration: 500, // Brief 0.5 second notification
    });
  };

  return { showSuccessToast };
};