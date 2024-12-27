interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
            i + 1 === currentStep ? 'bg-[#f65228]' : 'bg-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
};