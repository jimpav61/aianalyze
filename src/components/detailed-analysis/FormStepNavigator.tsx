import { Button } from "../ui/button";

interface FormStepNavigatorProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const FormStepNavigator = ({
  currentStep,
  onNext,
  onBack,
  onSubmit,
}: FormStepNavigatorProps) => {
  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      )}
      {currentStep < 3 ? (
        <Button className="ml-auto" onClick={onNext}>
          Next
        </Button>
      ) : (
        <Button className="ml-auto" onClick={onSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};