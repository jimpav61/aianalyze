import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isLastStep?: boolean;
}

export const FormNavigation = ({
  currentStep,
  onNext,
  onBack,
  onSubmit,
  isLastStep = false
}: FormNavigationProps) => {
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
          onClick={isLastStep ? onSubmit : onNext}
          className="w-24 bg-[#f65228] hover:bg-[#f65228]/90"
        >
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};