import { Button } from "@/components/ui/button";
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
  onNext,
  onBack,
  onSubmit,
}: StepNavigationProps) => {
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
          onClick={currentStep === 3 ? onSubmit : onNext}
          className="w-24 bg-[#f65228] hover:bg-[#f65228]/90"
        >
          {currentStep === 3 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};