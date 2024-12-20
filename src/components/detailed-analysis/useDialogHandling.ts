import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";

interface UseDialogHandlingProps {
  onClose: () => void;
  showFormOnly?: boolean;
}

export const useDialogHandling = ({ onClose, showFormOnly = false }: UseDialogHandlingProps) => {
  const [formData, setFormData] = useState<DetailedFormData | null>(null);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = useCallback((data: DetailedFormData) => {
    console.log("DetailedAnalysisDialog - Form submitted with data:", data);
    setFormData(data);
    setShowReport(true);
  }, []);

  const handleClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Handle close triggered", {
      showReport,
      showFormOnly
    });
    
    if (showReport && !showFormOnly) {
      setShowCloseConfirm(true);
    } else {
      onClose();
    }
  }, [onClose, showReport, showFormOnly]);

  const confirmClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Confirming close");
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