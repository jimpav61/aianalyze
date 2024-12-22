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
  });
  const { toast } = useToast();

  console.log("DetailedAnalysisForm - Current state:", { 
    currentStep, 
    formData, 
    industry, 
    analysis 
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

  const getFieldLabel = (field: string): string => {
    const labels: { [key: string]: string } = {
      companyName: "Company Name",
      ownerName: "Owner Name",
      email: "Email Address",
      revenue: "Annual Revenue",
      serviceChannels: "Service Channels",
      monthlyInteractions: "Monthly Interactions",
      objectives: "Business Objectives",
      timeline: "Implementation Timeline",
      budget: "Budget Range"
    };
    return labels[field] || field.replace(/([A-Z])/g, ' $1').toLowerCase();
  };

  const validateStep = (step: number) => {
    console.log("DetailedAnalysisForm - Validating step:", step);
    
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "ownerName", "email", "revenue"],
      2: ["serviceChannels", "monthlyInteractions"],
      3: ["objectives", "timeline", "budget"],
    };

    const missingFields = requiredFields[step].filter(
      (field) => !formData[field as keyof DetailedFormData]?.trim()
    );

    if (missingFields.length > 0) {
      console.warn("DetailedAnalysisForm - Missing required fields:", missingFields);
      toast({
        title: "Required Information Missing",
        description: `Please provide your ${missingFields
          .map((f) => getFieldLabel(f))
          .join(", ")}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    console.log("DetailedAnalysisForm - Attempting to move to next step");
    if (validateStep(currentStep)) {
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
      toast({
        title: "Unable to Generate Report",
        description: "We encountered an issue while processing your request. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (validateStep(currentStep)) {
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