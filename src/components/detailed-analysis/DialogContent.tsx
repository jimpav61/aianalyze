import { FormView } from "./FormView";
import { ReportView } from "./ReportView";
import { DetailedFormData } from "@/types/analysis";
import { DetailedAnalysisProps } from "./types";
import { useToast } from "@/hooks/use-toast";

interface DialogContentProps extends Pick<DetailedAnalysisProps, 'industry' | 'analysis'> {
  showReport: boolean;
  formData: DetailedFormData | null;
  onSubmit: (data: DetailedFormData) => void;
  onBookDemo: () => void;
}

export const DialogContent = ({ 
  showReport, 
  formData, 
  onSubmit, 
  industry, 
  analysis,
  onBookDemo
}: DialogContentProps) => {
  const { toast } = useToast();

  console.log("DialogContent - Render state:", { 
    showReport, 
    hasFormData: !!formData, 
    hasAnalysis: !!analysis,
    industry 
  });

  const handleFormSubmit = (data: DetailedFormData) => {
    console.log("DialogContent - Form submission handler called with data:", data);
    try {
      if (!analysis) {
        console.error("DialogContent - Missing analysis data for form submission");
        throw new Error("Missing analysis data");
      }
      console.log("DialogContent - Calling parent onSubmit with form data");
      onSubmit(data);
    } catch (error) {
      console.error("DialogContent - Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!showReport) {
    console.log("DialogContent - Showing form view");
    return (
      <FormView 
        onSubmit={handleFormSubmit}
        industry={industry}
        analysis={analysis}
      />
    );
  }

  if (!formData || !analysis) {
    console.error("DialogContent - Missing required data for report:", { formData, analysis });
    toast({
      title: "Error",
      description: "Unable to display report. Missing required data.",
      variant: "destructive",
    });
    return null;
  }

  console.log("DialogContent - Showing report view");
  return (
    <ReportView 
      formData={formData}
      analysis={analysis}
      onBookDemo={onBookDemo}
      industry={industry}
    />
  );
};