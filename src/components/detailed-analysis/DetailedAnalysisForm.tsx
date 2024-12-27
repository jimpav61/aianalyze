import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { DetailedFormData } from "@/types/analysis";
import { StepNavigation } from "./form/StepNavigation";
import { useDetailedFormState } from "@/hooks/useDetailedFormState";
import { StepIndicator } from "./form/StepIndicator";
import { useEffect } from "react";

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
  const {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange
  } = useDetailedFormState(initialData);

  // Reset scroll position when step changes
  useEffect(() => {
    const scrollArea = document.querySelector('.scroll-area-viewport');
    if (scrollArea) {
      scrollArea.scrollTop = 0;
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
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("DetailedAnalysisForm - Attempting to submit form");
    if (!analysis) {
      console.error("DetailedAnalysisForm - Missing analysis data");
      return;
    }
    onSubmit(formData);
  };

  return (
    <>
      <StepIndicator currentStep={currentStep} totalSteps={3} />
      <ScrollArea className="h-[calc(80vh-10rem)] pr-4">
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