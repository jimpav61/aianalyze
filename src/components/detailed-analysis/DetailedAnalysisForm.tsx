import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { FormStepNavigator } from "./FormStepNavigator";
import { DetailedFormData } from "@/types/analysis";
import { useDetailedAnalysisForm } from "@/hooks/useDetailedAnalysisForm";
import { useToast } from "@/components/ui/use-toast";

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
}

export const DetailedAnalysisForm = ({ 
  onSubmit, 
  industry,
  analysis 
}: DetailedAnalysisFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, handleInputChange, validateStep, handleSubmit } = useDetailedAnalysisForm(onSubmit);
  const { toast } = useToast();
  
  console.log("DetailedAnalysisForm - Initial props:", { industry, analysis });

  const handleNext = () => {
    console.log("Attempting to move to next step");
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    console.log("Moving to previous step");
    setCurrentStep((prev) => prev - 1);
  };

  const handleFormSubmit = () => {
    if (!analysis) {
      console.error("DetailedAnalysisForm - Missing analysis data");
      toast({
        title: "Error",
        description: "Unable to generate report. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (validateStep(3)) {
      console.log("DetailedAnalysisForm - Submitting form with data:", { formData, analysis });
      onSubmit(formData);
    }
  };

  return (
    <>
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

      <FormStepNavigator
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleFormSubmit}
      />
    </>
  );
};