import { useEffect } from "react";
import { DetailedFormData } from "@/types/analysis";

interface DialogStateManagerProps {
  isOpen: boolean;
  formData: DetailedFormData | null;
  analysis: any;
  showFormOnly: boolean;
  setShowReport: (show: boolean) => void;
  setFormData: (data: DetailedFormData | null) => void;
}

export const DialogStateManager = ({
  isOpen,
  formData,
  analysis,
  showFormOnly,
  setShowReport,
  setFormData
}: DialogStateManagerProps) => {
  // Reset scroll position when dialog content changes
  useEffect(() => {
    if (isOpen) {
      console.log("DialogStateManager - Dialog opened, resetting scroll position");
      window.scrollTo(0, 0);
      const dialogContent = document.querySelector('.dialog-content');
      if (dialogContent) {
        dialogContent.scrollTop = 0;
      }
    }
  }, [isOpen]);

  // Always show the form first when dialog opens
  useEffect(() => {
    if (isOpen) {
      setShowReport(false);
      setFormData(null);
      console.log("DialogStateManager - Dialog opened, showing initial form");
    }
  }, [isOpen, setShowReport, setFormData]);

  // Only show report after form submission and analysis is available
  useEffect(() => {
    if (analysis && formData && !showFormOnly) {
      console.log("DialogStateManager - Analysis data available after form submission, showing report");
      setShowReport(true);
    }
  }, [analysis, formData, showFormOnly, setShowReport]);

  return null;
};