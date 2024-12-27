import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

const getFieldLabel = (field: string): string => {
  const labels: { [key: string]: string } = {
    companyName: "Company Name",
    ownerName: "Owner Name",
    revenue: "Annual Revenue",
    email: "Email",
    serviceChannels: "Service Channels",
    monthlyInteractions: "Monthly Interactions",
    currentTools: "Current Tools",
    painPoints: "Pain Points",
    objectives: "Objectives",
    timeline: "Timeline",
    budget: "Budget"
  };
  return labels[field] || field;
};

export function useFormValidation() {
  const { toast } = useToast();
  
  const validateStep = (step: number, formData: DetailedFormData) => {
    console.log("ValidationUtils - Validating step:", step, "Current form data:", formData);
    
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "ownerName", "revenue"],
      2: ["serviceChannels", "monthlyInteractions", "currentTools", "painPoints"],
      3: ["objectives", "timeline", "budget"]
    };

    const missingFields = requiredFields[step]?.filter(
      (field) => {
        const value = formData[field as keyof DetailedFormData];
        return !value || (typeof value === 'string' && !value.trim());
      }
    );

    if (missingFields?.length > 0) {
      console.warn("ValidationUtils - Missing required fields:", missingFields);
      toast({
        title: "Required Fields Missing",
        description: `Please fill out: ${missingFields
          .map((f) => getFieldLabel(f))
          .join(", ")}`,
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
    
    console.log("ValidationUtils - Validation passed for step:", step);
    return true;
  };

  return { validateStep };
}