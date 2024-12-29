interface FormHeaderProps {
  currentStep: number;
}

export const FormHeader = ({ currentStep }: FormHeaderProps) => {
  return (
    <div id="form-top" className="mb-6">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Step {currentStep} of 3</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-16 h-1 rounded ${
                step <= currentStep ? 'bg-[#f65228]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};