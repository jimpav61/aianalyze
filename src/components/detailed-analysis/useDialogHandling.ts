import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";

interface UseDialogHandlingProps {
  onClose: () => void;
  showFormOnly?: boolean;
  resetOnClose?: boolean;
}

export const useDialogHandling = ({ 
  onClose, 
  showFormOnly = false,
  resetOnClose = true
}: UseDialogHandlingProps) => {
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
      showFormOnly,
      hasFormData: !!formData
    });
    
    if (showReport && !showFormOnly && formData) {
      setShowCloseConfirm(true);
    } else {
      if (resetOnClose) {
        setFormData(null);
        setShowReport(false);
      }
      onClose();
    }
  }, [onClose, showReport, showFormOnly, resetOnClose, formData]);

  const confirmClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Confirming close");
    setShowCloseConfirm(false);
    if (resetOnClose) {
      setFormData(null);
      setShowReport(false);
    }
    onClose();
  }, [onClose, resetOnClose]);

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