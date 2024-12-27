import { useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

interface UseDialogActionsProps {
  formData: DetailedFormData | null;
  showReport: boolean;
  showFormOnly: boolean;
  setShowReport: (show: boolean) => void;
  setShowCloseConfirm: (show: boolean) => void;
  setShowCalendar: (show: boolean) => void;
  onClose: () => void;
}

export const useDialogActions = ({
  formData,
  showReport,
  showFormOnly,
  setShowReport,
  setShowCloseConfirm,
  setShowCalendar,
  onClose
}: UseDialogActionsProps) => {
  const { toast } = useToast();

  const handleSubmit = useCallback((data: DetailedFormData) => {
    console.log("DetailedAnalysisDialog - Form submitted with data:", data);
    setShowReport(true);
  }, [setShowReport]);

  const handleClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Handle close triggered", {
      showReport,
      showFormOnly,
      hasFormData: !!formData
    });
    
    if (showReport && !showFormOnly && formData) {
      setShowCloseConfirm(true);
    } else {
      onClose();
    }
  }, [onClose, showReport, showFormOnly, formData, setShowCloseConfirm]);

  const handleBookDemo = useCallback(() => {
    console.log("DetailedAnalysisDialog - Book demo clicked with data:", {
      formData
    });
    
    if (!formData) {
      console.warn("DetailedAnalysisDialog - Book demo failed: No form data");
      toast({
        title: "Error",
        description: "Please complete the form first.",
        variant: "destructive",
        duration: 1500,
      });
      return false;
    }

    setShowCalendar(true);
    return true;
  }, [formData, toast, setShowCalendar]);

  return {
    handleSubmit,
    handleClose,
    handleBookDemo
  };
};