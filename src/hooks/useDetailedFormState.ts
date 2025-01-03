import { useState } from "react";
import { DetailedFormData } from "@/types/analysis";
import { DEFAULT_FORM_DATA } from "./detailed-form/defaultFormData";
import { useFormValidation } from "./detailed-form/useFormValidation";

export const useDetailedFormState = (initialData: DetailedFormData | null) => {
  console.log("useDetailedFormState - Initializing with data:", initialData);

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<DetailedFormData>(
    initialData || DEFAULT_FORM_DATA
  );

  const { validateStep } = useFormValidation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("useDetailedFormState - Input change:", { name, value });
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    errors,
    setErrors,
    handleInputChange,
    validateStep: (step: number) => validateStep(step, formData),
  };
};