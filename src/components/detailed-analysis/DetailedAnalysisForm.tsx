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
  analysis?: AnalysisData;
}

export const DetailedAnalysisForm = ({ 
  onSubmit, 
  industry,
  analysis 
}: DetailedAnalysisFormProps) => {
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
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "email"],
      2: ["serviceChannels", "monthlyInteractions"],
      3: ["objectives", "timeline", "budget"],
    };

    const missingFields = requiredFields[step].filter(
      (field) => !formData[field as keyof DetailedFormData]
    );

    if (missingFields.length > 0) {
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
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    if (!analysis) {
      toast({
        title: "Missing Analysis Data",
        description: "Please complete the initial analysis first.",
        variant: "destructive",
      });
      return;
    }

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