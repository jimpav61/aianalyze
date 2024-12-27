import { useToast } from "@/components/ui/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { supabase } from "@/integrations/supabase/client";

interface UseDialogActionsProps {
  formData: DetailedFormData | null;
  showReport: boolean;
  showFormOnly: boolean;
  setShowReport: (show: boolean) => void;
  setShowCloseConfirm: (show: boolean) => void;
  setShowCalendar: (show: boolean) => void;
  onClose: () => void;
  industry?: string;
}

export const useDialogActions = ({
  formData,
  showReport,
  showFormOnly,
  setShowReport,
  setShowCloseConfirm,
  setShowCalendar,
  onClose,
  industry
}: UseDialogActionsProps) => {
  const { toast } = useToast();

  const handleSubmit = async (data: DetailedFormData) => {
    console.log("useDialogActions - Submitting form with data:", { ...data, industry });

    try {
      const { data: analysisData, error } = await supabase.functions.invoke('generate-analysis', {
        body: JSON.stringify({ 
          formData: {
            ...data,
            industry
          }
        })
      });

      if (error) throw error;

      console.log("useDialogActions - Generated analysis:", analysisData);
      
      // Always show report after form submission
      setShowReport(true);

      toast({
        title: "Analysis Generated",
        description: "Your custom analysis report is ready.",
        duration: 1500,
      });

    } catch (error) {
      console.error("Error generating analysis:", error);
      toast({
        title: "Error",
        description: "Failed to generate analysis. Please try again.",
        variant: "destructive",
        duration: 1500,
      });
    }
  };

  const handleClose = () => {
    if (formData && !showReport) {
      setShowCloseConfirm(true);
    } else {
      onClose();
    }
  };

  const handleBookDemo = () => {
    console.log("useDialogActions - Booking demo");
    setShowCalendar(true);
  };

  return {
    handleSubmit,
    handleClose,
    handleBookDemo
  };
};