import { DetailedFormData } from "@/types/analysis";
import { StepNavigation } from "./form/StepNavigation";
import { useDetailedFormState } from "@/hooks/useDetailedFormState";
import { useToast } from "@/hooks/use-toast";
import { FormHeader } from "./form/FormHeader";
import { FormContent } from "./form/FormContent";

interface DetailedAnalysisFormProps {
  onSubmit: (data: DetailedFormData) => void;
  industry?: string;
  analysis?: any;
  initialData: DetailedFormData | null;
}

export const DetailedAnalysisForm = ({
  onSubmit,
  industry,
  analysis,
  initialData,
}: DetailedAnalysisFormProps) => {
  const { toast } = useToast();
  const {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange,
    validateStep,
    errors,
    setErrors,
  } = useDetailedFormState(initialData);

  const handleNext = () => {
    const stepValidation = validateStep(currentStep);
    if (!stepValidation.isValid) {
      setErrors(stepValidation.errors);
      toast({
        title: "Required Fields Missing",
        description: "Please fill out all required fields before proceeding.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    setCurrentStep((prev) => prev + 1);
    setErrors({});
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    const stepValidation = validateStep(currentStep);
    if (!stepValidation.isValid) {
      setErrors(stepValidation.errors);
      toast({
        title: "Required Fields Missing",
        description: "Please fill out all required fields before submitting.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    console.log("Form submitted with data:", formData);
    onSubmit(formData);
  };

  return (
    <>
      <FormHeader currentStep={currentStep} />
      <FormContent
        currentStep={currentStep}
        formData={formData}
        handleInputChange={handleInputChange}
        errors={errors}
      />
      <StepNavigation
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        formData={formData}
      />
    </>
  );
};