import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { FormStepNavigator } from "./FormStepNavigator";
import { DetailedFormData } from "@/types/analysis";
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
}

export const DetailedAnalysisForm = ({ 
  onSubmit, 
  industry,
  analysis 
}: DetailedAnalysisFormProps) => {
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
  const { toast } = useToast();

  console.log("DetailedAnalysisForm - Initial props:", { industry, analysis });

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
    console.log("Validating step:", step, "Current form data:", formData);
    
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "email"],
      2: ["serviceChannels", "monthlyInteractions"],
      3: ["objectives", "timeline", "budget"],
    };

    const missingFields = requiredFields[step].filter(
      (field) => !formData[field as keyof DetailedFormData]?.trim()
    );

    if (missingFields.length > 0) {
      console.warn("Missing required fields:", missingFields);
      toast({
        title: "Required Fields Missing",
        description: `Please fill out the following fields: ${missingFields
          .map((f) => f.replace(/([A-Z])/g, " $1").toLowerCase())
          .join(", ")}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    console.log("Attempting to move to next step");
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("DetailedAnalysisForm - Form submission handler called");
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

      <FormStepNavigator
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </>
  );
};