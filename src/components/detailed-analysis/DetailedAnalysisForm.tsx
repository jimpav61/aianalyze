import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { DetailedFormData } from "@/types/analysis";
import { StepNavigation } from "./form/StepNavigation";
import { useDetailedFormState } from "@/hooks/useDetailedFormState";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";

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

  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log("DetailedAnalysisForm - Current state:", { 
    currentStep, 
    formData, 
    industry, 
    analysis,
    hasInitialData: !!initialData
  });

  const validateStep = (step: number) => {
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "ownerName", "email", "revenue"],
      2: ["serviceChannels", "monthlyInteractions"],
      3: ["objectives", "timeline", "budget"]
    };

    const missingFields = requiredFields[step]?.filter(
      field => !formData[field as keyof DetailedFormData]?.trim()
    );

    if (missingFields?.length) {
      toast({
        title: "Required Fields Missing",
        description: `Please fill out: ${missingFields.map(f => f.replace(/([A-Z])/g, ' $1').toLowerCase()).join(', ')}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => prev + 1);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const handleSubmit = () => {
    console.log("DetailedAnalysisForm - Attempting to submit form");
    if (!validateStep(currentStep)) return;
    if (!analysis) {
      console.error("DetailedAnalysisForm - Missing analysis data");
      return;
    }
    onSubmit(formData);
  };

  return (
    <>
      <div className="mb-6">
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

      <ScrollArea className="h-[calc(80vh-10rem)] pr-4" ref={scrollRef}>
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
