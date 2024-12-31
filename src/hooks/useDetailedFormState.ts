import { useState } from "react";
import { DetailedFormData } from "@/types/analysis";

interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

const DEFAULT_FORM_DATA: DetailedFormData = {
  companyName: "Test Company",
  ownerName: "John Doe",
  phoneNumber: "(555) 555-5555",
  email: "test@example.com",
  employees: "10-20",
  revenue: "100k-500k",
  serviceChannels: "email",
  monthlyInteractions: "500-1000",
  currentTools: "zendesk",
  painPoints: "Long customer wait times",
  objectives: "Reduce operational costs",
  timeline: "3-6",
  budget: "5000-10000",
  additionalInfo: "Testing the full flow",
};

export const useDetailedFormState = (initialData: DetailedFormData | null) => {
  console.log("useDetailedFormState - Initializing with data:", initialData);

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<DetailedFormData>(
    initialData || DEFAULT_FORM_DATA // Using test data for development
  );

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

  const validateStep = (step: number): ValidationResult => {
    console.log("useDetailedFormState - Validating step:", step);
    
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    const validateField = (field: string, label: string) => {
      if (!formData[field as keyof DetailedFormData]?.trim()) {
        newErrors[field] = `${label} is required`;
        isValid = false;
      }
    };

    switch (step) {
      case 1:
        validateField("companyName", "Company name");
        validateField("ownerName", "Owner name");
        validateField("phoneNumber", "Phone number");
        validateField("email", "Email");
        validateField("revenue", "Annual revenue");
        // Validate email format
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
          isValid = false;
        }
        break;

      case 2:
        validateField("serviceChannels", "Service channels");
        validateField("monthlyInteractions", "Monthly interactions");
        validateField("currentTools", "Current tools");
        validateField("painPoints", "Pain points");
        break;

      case 3:
        validateField("objectives", "Business objectives");
        validateField("timeline", "Implementation timeline");
        validateField("budget", "Budget range");
        break;
    }

    console.log("useDetailedFormState - Validation result:", { isValid, errors: newErrors });
    return { isValid, errors: newErrors };
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    errors,
    setErrors,
    handleInputChange,
    validateStep,
  };
};