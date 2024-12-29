import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { DetailedFormData } from "@/types/analysis";
import { StepNavigation } from "./form/StepNavigation";
import { useDetailedFormState } from "@/hooks/useDetailedFormState";
import { useToast } from "@/hooks/use-toast";

interface DetailedAnalysisFormProps {
  onSubmit: (data: DetailedFormData) => void;
  industry?: string;
  analysis?: any;
  initialData: DetailedFormData | null;
}

export const DetailedAnalysisForm = ({
  onSubmit,
  industry,
  analysis,
  initialData,
}: DetailedAnalysisFormProps) => {
  const { toast } = useToast();
  const {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange,
    validateStep,
    errors,
    setErrors,
  } = useDetailedFormState(initialData);

  // Add effect to scroll to top when step changes
  useEffect(() => {
    const formTop = document.getElementById('form-top');
    if (formTop) {
      formTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  const handleNext = () => {
    const stepValidation = validateStep(currentStep);
    if (!stepValidation.isValid) {
      setErrors(stepValidation.errors);
      toast({
        title: "Required Fields Missing",
        description: "Please fill out all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep((prev) => prev + 1);
    setErrors({});
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    const stepValidation = validateStep(currentStep);
    if (!stepValidation.isValid) {
      setErrors(stepValidation.errors);
      toast({
        title: "Required Fields Missing",
        description: "Please fill out all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    console.log("Form submitted with data:", formData);
    onSubmit(formData);
  };

  return (
    <>
      <div id="form-top" className="mb-6">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Step {currentStep} of 3</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-16 h-1 rounded ${
                  step <= currentStep ? 'bg-[#f65228]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(80vh-10rem)] pr-4">
        {currentStep === 1 && (
          <CompanyBasicsStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <OperationsStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {currentStep === 3 && (
          <GoalsStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
      </ScrollArea>

      <StepNavigation
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        formData={formData}
      />
    </>
  );
};