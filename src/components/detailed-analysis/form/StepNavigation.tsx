import { Button } from "@/components/ui/button";
import { useFormValidation } from "./ValidationUtils";
import { DetailedFormData } from "@/types/analysis";

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

  const handleNext = () => {
    console.log("StepNavigation - Attempting to move to next step");
    if (validateStep(currentStep, formData)) {
      onNext();
      console.log("StepNavigation - Moving to next step");
    }
  };

  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <Button type="button" variant="outline" onClick={onBack} className="w-24">
          Back
        </Button>
      )}
      <div className="ml-auto">
        <Button
          type="button"
          onClick={currentStep === 3 ? onSubmit : handleNext}
          className="w-24 bg-[#f65228] hover:bg-[#f65228]/90"
        >
          {currentStep === 3 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};