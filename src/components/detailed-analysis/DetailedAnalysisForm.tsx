import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { DetailedFormData } from "@/types/analysis";
import { StepNavigation } from "./form/StepNavigation";
import { useDetailedFormState } from "@/hooks/useDetailedFormState";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface DetailedAnalysisFormProps {
  onSubmit: (formData: DetailedFormData) => void;
  industry?: string;
  analysis?: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  };
  initialData: DetailedFormData | null;
}

export const DetailedAnalysisForm = ({ 
  onSubmit, 
  industry,
  analysis,
  initialData
}: DetailedAnalysisFormProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange
  } = useDetailedFormState(initialData);

  // Force scroll to top whenever step changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      console.log("DetailedAnalysisForm - Forcing scroll to top");
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 0);
    }
  }, [currentStep]);

  console.log("DetailedAnalysisForm - Current state:", { 
    currentStep, 
    formData, 
    industry, 
    analysis,
    hasInitialData: !!initialData
  });

  const handleNext = () => {
    console.log("DetailedAnalysisForm - Moving to next step:", currentStep + 1);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    console.log("DetailedAnalysisForm - Moving to previous step:", currentStep - 1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("DetailedAnalysisForm - Attempting to submit form with data:", formData);
    if (!analysis) {
      console.error("DetailedAnalysisForm - Missing analysis data");
      toast({
        title: "Error",
        description: "Unable to submit form. Missing analysis data.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <>
      <ScrollArea ref={scrollAreaRef} className="h-[calc(80vh-10rem)] pr-4">
        {currentStep === 1 && (
          <CompanyBasicsStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        {currentStep === 2 && (
          <OperationsStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        {currentStep === 3 && (
          <GoalsStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
      </ScrollArea>

      <StepNavigation
        currentStep={currentStep}
        formData={formData}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </>
  );
};