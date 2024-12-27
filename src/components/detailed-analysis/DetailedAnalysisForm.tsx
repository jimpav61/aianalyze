import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "./CompanyBasicsStep";
import { OperationsStep } from "./OperationsStep";
import { GoalsStep } from "./GoalsStep";
import { DetailedFormData } from "@/types/analysis";
import { StepNavigation } from "./form/StepNavigation";
import { useDetailedFormState } from "@/hooks/useDetailedFormState";
import { StepIndicator } from "./form/StepIndicator";
import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = 0;
      }
    }
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log("DetailedAnalysisForm - Submitting form with data:", {
        ...formData,
        industry
      });

      const { data: analysisData, error } = await supabase.functions.invoke('generate-analysis', {
        body: JSON.stringify({ 
          formData: {
            ...formData,
            industry
          }
        })
      });

      if (error) throw error;

      console.log("DetailedAnalysisForm - Generated analysis:", analysisData);
      onSubmit(formData);

    } catch (error) {
      console.error("Error generating analysis:", error);
      toast({
        title: "Error",
        description: "Failed to generate analysis. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <StepIndicator currentStep={currentStep} totalSteps={3} />
      <ScrollArea ref={scrollAreaRef} className="h-[calc(80vh-10rem)] pr-4">
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