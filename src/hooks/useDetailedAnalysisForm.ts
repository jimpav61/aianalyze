import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DetailedFormData } from "@/types/analysis";

export const useDetailedAnalysisForm = (onSubmit: (data: DetailedFormData) => void) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DetailedFormData>({
    companyName: "",
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
      1: ["companyName", "email"],
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

  const handleSubmit = (analysis: any) => {
    console.log("Attempting to submit form", { formData, analysis });
    
    if (!analysis || typeof analysis !== 'object') {
      console.error("Missing or invalid analysis data:", analysis);
      toast({
        title: "Missing Analysis Data",
        description: "Please complete the initial analysis first.",
        variant: "destructive",
      });
      return;
    }

    const requiredFields = ['industry', 'department', 'bot_function', 'savings', 'profit_increase', 'explanation', 'marketing_strategy'];
    const missingFields = requiredFields.filter(field => !(field in analysis));
    
    if (missingFields.length > 0) {
      console.error("Missing required analysis fields:", missingFields);
      toast({
        title: "Invalid Analysis Data",
        description: "The analysis data is incomplete. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (validateStep(3)) {
      const finalFormData = {
        ...formData,
        additionalInfo: formData.additionalInfo || ""
      };
      console.log("Form validation passed, submitting with data:", finalFormData);
      onSubmit(finalFormData);
    }
  };

  return {
    formData,
    handleInputChange,
    validateStep,
    handleSubmit,
  };
};