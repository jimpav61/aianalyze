import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { FormStepNavigator } from "./FormStepNavigator";
import { useToast } from "@/components/ui/use-toast";
import { DetailedFormData } from "@/types/analysis";

interface DetailedAnalysisFormProps {
  onSubmit: (formData: DetailedFormData) => void;
}

export const DetailedAnalysisForm = ({ onSubmit }: DetailedAnalysisFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DetailedFormData>({
    companyName: "",
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
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.companyName || !formData.email) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill out company name and email before proceeding.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!formData.serviceChannels || !formData.monthlyInteractions) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill out service channels and monthly interactions before proceeding.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!formData.objectives || !formData.timeline) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill out objectives and timeline before submitting.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    if (validateStep(3)) {
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
        onSubmit={handleSubmit}
      />
    </>
  );
};