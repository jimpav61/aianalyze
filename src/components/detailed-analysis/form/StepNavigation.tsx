import { Button } from "@/components/ui/button";
import { useFormValidation } from "./ValidationUtils";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

interface StepNavigationProps {
  currentStep: number;
  formData: DetailedFormData;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
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
    e.preventDefault(); // Prevent form submission
    console.log("StepNavigation - Attempting to move to next step");
    if (validateStep(currentStep, formData)) {
      console.log("StepNavigation - Validation passed, moving to next step");
      onNext();
    } else {
      console.log("StepNavigation - Validation failed");
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (validateStep(currentStep, formData)) {
      onSubmit();
    }
  };

  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }} 
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