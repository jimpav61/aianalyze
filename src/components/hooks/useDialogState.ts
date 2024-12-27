import { useState } from "react";
import { DetailedFormData } from "@/types/analysis";

export const useDialogState = () => {
  const [formData, setFormData] = useState<DetailedFormData | null>(null);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  return {
    formData,
    setFormData,
    showCloseConfirm,
    setShowCloseConfirm,
    showReport,
    setShowReport,
    showCalendar,
    setShowCalendar
  };
};