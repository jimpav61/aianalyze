import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

export const getFieldLabel = (field: string): string => {
  const labels: { [key: string]: string } = {
    companyName: "Company Name",
    ownerName: "Owner Name",
    email: "Email Address",
    revenue: "Annual Revenue",
    serviceChannels: "Service Channels",
    monthlyInteractions: "Monthly Interactions",
    currentTools: "Current Tools",
    painPoints: "Pain Points",
    objectives: "Business Objectives",
    timeline: "Implementation Timeline",
    budget: "Budget Range"
  };
  return labels[field] || field.replace(/([A-Z])/g, ' $1').toLowerCase();
};

export const useFormValidation = () => {
  const { toast } = useToast();

  const validateStep = (step: number, formData: DetailedFormData) => {
    console.log("Validating step:", step, "Current form data:", formData);
    
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "ownerName", "email", "revenue"],
      2: ["serviceChannels", "monthlyInteractions", "currentTools", "painPoints"],
      3: ["objectives", "timeline", "budget"],
    };

    const missingFields = requiredFields[step].filter((field) => {
      const value = formData[field as keyof DetailedFormData];
      if (!value) return true;
      
      // Special handling for comma-separated fields
      if (field === "serviceChannels" || field === "currentTools" || field === "painPoints") {
        return value.trim().split(",").filter(item => item.trim()).length === 0;
      }
      
      return !value.trim();
    });

    if (missingFields.length > 0) {
      console.warn("Missing required fields:", missingFields);
      toast({
        title: "Required Information Missing",
        description: `Please provide your ${missingFields
          .map((f) => getFieldLabel(f))
          .join(", ")}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return { validateStep };
};