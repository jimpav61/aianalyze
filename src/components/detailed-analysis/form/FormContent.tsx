import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "../CompanyBasicsStep";
import { OperationsStep } from "../OperationsStep";
import { GoalsStep } from "../GoalsStep";
import { DetailedFormData } from "@/types/analysis";
import { useEffect } from "react";

interface FormContentProps {
  currentStep: number;
  formData: DetailedFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: { [key: string]: string };
}

export const FormContent = ({
  currentStep,
  formData,
  handleInputChange,
  errors,
}: FormContentProps) => {
  // Handle scrolling to top when step changes
  useEffect(() => {
    setTimeout(() => {
      const scrollArea = document.querySelector('.scroll-area-viewport');
      if (scrollArea) {
        scrollArea.scrollTop = 0;
      }
    }, 0);
  }, [currentStep]);

  return (
    <ScrollArea className="h-[calc(80vh-10rem)] pr-4 scroll-area">
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
  );
};