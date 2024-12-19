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
    if (showReport && !showFormOnly) {
      setShowCloseConfirm(true);
    } else {
      console.log("DetailedAnalysisDialog - Dialog closing");
      onClose();
    }
  }, [onClose, showReport, showFormOnly]);

  const confirmClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Closing confirmation dialog");
    setShowCloseConfirm(false);
  }, []);

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