import { DetailedAnalysisForm } from "./DetailedAnalysisForm";
import { DetailedReport } from "../DetailedReport";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { DetailedFormData } from "@/types/analysis";
import { DetailedAnalysisProps } from "./types";
import { useAnalysisProcessor } from "./useAnalysisProcessor";
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
  const { getProcessedAnalysis } = useAnalysisProcessor({ industry, analysis });

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

  // Show form if not in report view
  if (!showReport) {
    console.log("DialogContent - Showing form view");
    return (
      <>
        <DialogHeader>
          <DialogTitle>Detailed Analysis Request</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <DetailedAnalysisForm 
            onSubmit={handleFormSubmit} 
            industry={industry}
            analysis={analysis}
          />
        </div>
      </>
    );
  }

  // Validate data for report view
  if (!formData || !analysis) {
    console.error("DialogContent - Missing required data for report:", { formData, analysis });
    toast({
      title: "Error",
      description: "Unable to display report. Missing required data.",
      variant: "destructive",
    });
    return null;
  }

  // Process analysis data for report
  console.log("DialogContent - Processing analysis for report");
  const processedAnalysis = getProcessedAnalysis();
  console.log("DialogContent - Processed analysis:", processedAnalysis);

  // Prepare analyses grid data
  const analysesForGrid = analysis.allAnalyses || [{
    id: crypto.randomUUID(),
    department: processedAnalysis.department,
    function: processedAnalysis.bot_function,
    savings: processedAnalysis.savings.toString(),
    profit_increase: processedAnalysis.profit_increase.toString(),
    explanation: processedAnalysis.explanation,
    marketingStrategy: processedAnalysis.marketing_strategy
  }];

  console.log("DialogContent - Rendering report with data:", {
    formData,
    processedAnalysis,
    analysesForGrid
  });

  return (
    <div className="space-y-6">
      <DetailedReport 
        data={formData} 
        analysis={processedAnalysis}
        analyses={analysesForGrid}
        onBookDemo={onBookDemo}
      />
    </div>
  );
};