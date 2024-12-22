import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { DetailedFormData } from "@/types/analysis";
import { useFormValidation } from "./form/ValidationUtils";
import { FormNavigation } from "./form/FormNavigation";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DetailedFormData>(
    initialData || {
      companyName: "",
      ownerName: "",
      phoneNumber: "",
      email: "",
      employees: "",
      revenue: "",
      serviceChannels: "",
      monthlyInteractions: "",
      currentTools: "",
      painPoints: "",
      objectives: "",
      timeline: "",
      budget: "",
      additionalInfo: "",
    }
  );

  const { validateStep } = useFormValidation();

  console.log("DetailedAnalysisForm - Current state:", { 
    currentStep, 
    formData, 
    industry, 
    analysis,
    hasInitialData: !!initialData
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("DetailedAnalysisForm - Input changed:", { name, value });
  };

  const handleNext = () => {
    console.log("DetailedAnalysisForm - Attempting to move to next step");
    if (validateStep(currentStep, formData)) {
      setCurrentStep((prev) => prev + 1);
      console.log("DetailedAnalysisForm - Moving to next step");
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    console.log("DetailedAnalysisForm - Moving to previous step");
  };

  const handleSubmit = () => {
    console.log("DetailedAnalysisForm - Attempting to submit form");
    if (!analysis) {
      console.error("DetailedAnalysisForm - Missing analysis data");
      return;
    }

    if (validateStep(currentStep, formData)) {
      console.log("DetailedAnalysisForm - Form validation passed, submitting data:", formData);
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

      <FormNavigation
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        isLastStep={currentStep === 3}
      />
    </>
  );
};