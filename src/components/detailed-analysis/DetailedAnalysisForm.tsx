import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { FormStepNavigator } from "./FormStepNavigator";
import { useToast } from "@/components/ui/use-toast";
import { DetailedFormData, AnalysisData } from "@/types/analysis";

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
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  console.log("DetailedAnalysisForm - Initial props:", { industry, analysis });

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
    additionalInfo: "", // This is optional
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
    console.log("DetailedAnalysisForm - Validating step:", step, "Current form data:", formData);
    
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "email"],
      2: ["serviceChannels", "monthlyInteractions"],
      3: ["objectives", "timeline", "budget"], // additionalInfo is not required
    };

    const missingFields = requiredFields[step].filter(
      (field) => !formData[field as keyof DetailedFormData]?.trim()
    );

    if (missingFields.length > 0) {
      console.warn("DetailedAnalysisForm - Missing required fields:", missingFields);
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
    console.log("DetailedAnalysisForm - Attempting to move to next step");
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    console.log("DetailedAnalysisForm - Moving to previous step");
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("DetailedAnalysisForm - Attempting to submit form", { formData, analysis });
    
    if (!analysis || typeof analysis !== 'object') {
      console.error("DetailedAnalysisForm - Missing or invalid analysis data:", analysis);
      toast({
        title: "Missing Analysis Data",
        description: "Please complete the initial analysis first.",
        variant: "destructive",
      });
      return;
    }

    // Validate required analysis fields
    const requiredFields = ['industry', 'department', 'bot_function', 'savings', 'profit_increase', 'explanation', 'marketing_strategy'];
    const missingFields = requiredFields.filter(field => !(field in analysis));
    
    if (missingFields.length > 0) {
      console.error("DetailedAnalysisForm - Missing required analysis fields:", missingFields);
      toast({
        title: "Invalid Analysis Data",
        description: "The analysis data is incomplete. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Only validate required fields in step 3, additionalInfo is optional
    if (validateStep(3)) {
      // Ensure additionalInfo is at least an empty string if undefined
      const finalFormData = {
        ...formData,
        additionalInfo: formData.additionalInfo || ""
      };
      console.log("DetailedAnalysisForm - Form validation passed, submitting with data:", finalFormData);
      onSubmit(finalFormData);
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