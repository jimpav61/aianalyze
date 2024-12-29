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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Immediately reset scroll positions
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    
    // Use a short timeout to ensure content is rendered
    const timeoutId = setTimeout(() => {
      // Reset container scroll
      if (containerRef.current) {
        containerRef.current.scrollTo(0, 0);
      }
      
      // Reset ScrollArea scroll
      const scrollAreaViewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollAreaViewport instanceof HTMLElement) {
        scrollAreaViewport.scrollTo(0, 0);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [currentStep]);

  return (
    <div ref={containerRef} className="flex-1 overflow-hidden">
      <ScrollArea 
        ref={scrollAreaRef}
        className="h-[60vh] w-full rounded-md px-4"
      >
        <div className="py-1">
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