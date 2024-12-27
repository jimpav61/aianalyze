import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

const getFieldLabel = (field: string): string => {
  const labels: { [key: string]: string } = {
    companyName: "Company Name",
    ownerName: "Owner Name",
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
    console.log("Validating step:", step, "Current form data:", formData);
    
    const requiredFields: { [key: number]: string[] } = {
      1: ["companyName", "ownerName", "email"],
      2: ["serviceChannels", "monthlyInteractions", "currentTools", "painPoints"],
      3: ["objectives", "timeline", "budget"]
    };

    const missingFields = requiredFields[step]?.filter(
      (field) => !formData[field as keyof DetailedFormData]?.trim()
    );

    if (missingFields?.length > 0) {
      console.warn("Missing required fields:", missingFields);
      toast({
        title: "Required Fields Missing",
        description: `Please fill out the following fields: ${missingFields
          .map((f) => getFieldLabel(f))
          .join(", ")}`,
        variant: "destructive",
        duration: 1000,
        className: "preserve-state"
      });
      return false;
    }
    return true;
  };

  return { validateStep };
}