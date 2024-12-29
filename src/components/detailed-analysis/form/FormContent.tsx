import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyBasicsStep } from "../CompanyBasicsStep";
import { OperationsStep } from "../OperationsStep";
import { GoalsStep } from "../GoalsStep";
import { DetailedFormData } from "@/types/analysis";
import { useEffect, useRef } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  return (
    <ScrollArea ref={scrollRef} className="h-[calc(80vh-10rem)] pr-4">
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