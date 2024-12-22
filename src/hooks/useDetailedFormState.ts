import { useState } from "react";
import { DetailedFormData } from "@/types/analysis";

export const useDetailedFormState = (initialData: DetailedFormData | null) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DetailedFormData>(
    initialData || {
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
    }
  );

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