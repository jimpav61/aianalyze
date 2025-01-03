import { DetailedFormData } from "@/types/analysis";

interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const useFormValidation = () => {
  const validateField = (
    formData: DetailedFormData,
    field: string,
    label: string
  ): string | null => {
    if (!formData[field as keyof DetailedFormData]?.trim()) {
      return `${label} is required`;
    }
    
    // Special validation for email
    if (field === 'email' && formData.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        return 'Please enter a valid email address';
      }
    }
    
    return null;
  };

  const validateStep = (step: number, formData: DetailedFormData): ValidationResult => {
    console.log("useFormValidation - Validating step:", step);
    
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    const validateAndAddError = (field: string, label: string) => {
      const error = validateField(formData, field, label);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    };

    switch (step) {
      case 1:
        validateAndAddError("companyName", "Company name");
        validateAndAddError("ownerName", "Owner name");
        validateAndAddError("phoneNumber", "Phone number");
        validateAndAddError("email", "Email");
        validateAndAddError("revenue", "Annual revenue");
        break;

      case 2:
        validateAndAddError("serviceChannels", "Service channels");
        validateAndAddError("monthlyInteractions", "Monthly interactions");
        validateAndAddError("currentTools", "Current tools");
        validateAndAddError("painPoints", "Pain points");
        break;

      case 3:
        validateAndAddError("objectives", "Business objectives");
        validateAndAddError("timeline", "Implementation timeline");
        validateAndAddError("budget", "Budget range");
        break;
    }

    console.log("useFormValidation - Validation result:", { isValid, errors: newErrors });
    return { isValid, errors: newErrors };
  };

  return { validateStep };
};