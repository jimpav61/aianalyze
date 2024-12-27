import { Button } from "@/components/ui/button";
import { useFormValidation } from "./ValidationUtils";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

interface StepNavigationProps {
  currentStep: number;
  formData: DetailedFormData;
  onNext: (e: React.MouseEvent) => void;
  onBack: (e: React.MouseEvent) => void;
  onSubmit: (e: React.MouseEvent) => void;
}

export const StepNavigation = ({
  currentStep,
  formData,
  onNext,
  onBack,
  onSubmit,
}: StepNavigationProps) => {
  const { validateStep } = useFormValidation();
  const { toast } = useToast();

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("StepNavigation - Attempting to move to next step");
    if (validateStep(currentStep, formData)) {
      console.log("StepNavigation - Validation passed, moving to next step");
      onNext(e);
    } else {
      console.log("StepNavigation - Validation failed");
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("StepNavigation - Attempting to submit");
    if (validateStep(currentStep, formData)) {
      console.log("StepNavigation - Validation passed, submitting");
      onSubmit(e);
    } else {
      console.log("StepNavigation - Validation failed");
    }
  };

  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="w-24"
        >
          Back
        </Button>
      )}
      <div className="ml-auto">
        <Button
          type="button"
          onClick={currentStep === 3 ? handleSubmit : handleNext}
          className="w-24 bg-[#f65228] hover:bg-[#f65228]/90"
        >
          {currentStep === 3 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};