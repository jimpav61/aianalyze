import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DetailedFormData } from "@/types/analysis";

export const useDetailedAnalysisForm = (onSubmit: (data: DetailedFormData) => void) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DetailedFormData>({
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
    industry: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (step: number) => {
    console.log("Validating step:", step, "Current form data:", formData);
    
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "ownerName", "email"],
      2: ["serviceChannels", "monthlyInteractions"],
      3: ["objectives", "timeline", "budget"],
    };

    const missingFields = requiredFields[step].filter(
      (field) => !formData[field as keyof DetailedFormData]?.trim()
    );

    if (missingFields.length > 0) {
      console.warn("Missing required fields:", missingFields);
      toast({
        title: "Required Fields Missing",
        description: `Please fill out the following fields: ${missingFields
          .map((f) => f.replace(/([A-Z])/g, " $1").toLowerCase())
          .join(", ")}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return {
    formData,
    handleInputChange,
    validateStep,
  };
};