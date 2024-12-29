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
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto">
      <ScrollArea className="h-[60vh] w-full rounded-md px-4">
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
    </div>
  );
};