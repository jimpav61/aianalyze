import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

interface UseDialogHandlingProps {
  onClose: () => void;
  showFormOnly?: boolean;
}

export const useDialogHandling = ({ onClose, showFormOnly = false }: UseDialogHandlingProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DetailedFormData | null>(null);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = useCallback((data: DetailedFormData) => {
    console.log("DetailedAnalysisDialog - Form submitted with data:", data);
    
    if (!data) {
      console.error("DetailedAnalysisDialog - Missing form data");
      toast({
        title: "Error",
        description: "Unable to process form submission. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setFormData(data);
    setShowReport(true);
    toast({
      title: "Success",
      description: "Your analysis report is ready!",
    });
    console.log("DetailedAnalysisDialog - Report view enabled");
  }, [toast]);

  const handleClose = useCallback(() => {
    if (showReport && !showFormOnly) {
      setShowCloseConfirm(true);
    } else {
      console.log("DetailedAnalysisDialog - Dialog closing");
      onClose();
    }
  }, [onClose, showReport, showFormOnly]);

  const confirmClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Confirmed closing");
    setShowCloseConfirm(false);
    onClose();
  }, [onClose]);

  return {
    formData,
    showCloseConfirm,
    showReport,
    setShowCloseConfirm,
    setShowReport,
    handleSubmit,
    handleClose,
    confirmClose
  };
};