import { useState, useEffect } from "react";
import { DetailedFormData } from "@/types/analysis";

export const useDetailedFormState = (initialData: DetailedFormData | null) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DetailedFormData>(() => {
    if (initialData) {
      return { ...initialData };
    }
    return {
      companyName: "",
      ownerName: "",
      phoneNumber: "",
      email: "",
      employees: "",
      revenue: "",
      serviceChannels: "",
      monthlyInteractions: "",
      currentTools: "",
      painPoints: "",
      objectives: "",
      timeline: "",
      budget: "",
      additionalInfo: "",
    };
  });

  // Preserve form data when component remounts
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("DetailedAnalysisForm - Input changed:", { name, value });
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    handleInputChange,
  };
};