import { useToast } from "@/hooks/use-toast";

export const useSuccessToast = () => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Success",
      description: "Your demo has been scheduled successfully!",
      duration: 1500, // Updated to 1.5 seconds
    });
  };

  return { showSuccessToast };
};