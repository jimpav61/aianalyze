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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll position when step changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
    
    // Force scroll to top after a brief delay to ensure content is rendered
    const timeoutId = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [currentStep]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto">
      <ScrollArea 
        ref={scrollAreaRef} 
        className="h-[60vh] w-full rounded-md px-4"
      >
        <div className="min-h-full">
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
        </div>
      </ScrollArea>
    </div>
  );
};