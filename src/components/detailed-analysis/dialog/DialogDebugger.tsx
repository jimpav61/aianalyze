interface DialogDebuggerProps {
  showReport: boolean;
  showCalendar: boolean;
  formData: any;
  analysis: any;
  isOpen: boolean;
  industry: string;
}

export const DialogDebugger = ({
  showReport,
  showCalendar,
  formData,
  analysis,
  isOpen,
  industry
}: DialogDebuggerProps) => {
  console.log("DetailedAnalysisDialog - Current state:", {
    showReport,
    showCalendar,
    hasFormData: !!formData,
    showFormOnly: false,
    hasAnalysis: !!analysis,
    formDataContent: formData,
    analysisContent: analysis,
    isDialogOpen: isOpen,
    currentIndustry: industry
  });

  return null;
};