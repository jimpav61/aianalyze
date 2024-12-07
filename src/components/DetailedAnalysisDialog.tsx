import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { CompanyBasicsStep } from "./detailed-analysis/CompanyBasicsStep";
import { OperationsStep } from "./detailed-analysis/OperationsStep";
import { GoalsStep } from "./detailed-analysis/GoalsStep";

interface DetailedAnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  industry?: string;
}

export const DetailedAnalysisDialog = ({
  isOpen,
  onClose,
  industry,
}: DetailedAnalysisDialogProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    phoneNumber: "",
    email: "",
    employees: "",
    revenue: "",
    serviceChannels: "",
    monthlyInteractions: "",
    objectives: "",
    timeline: "",
    budget: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting detailed analysis form:", formData);
    toast({
      title: "Detailed analysis request submitted!",
      description: "We'll analyze your information and get back to you soon.",
    });
    onClose();
    setStep(1);
    setFormData({
      companyName: "",
      phoneNumber: "",
      email: "",
      employees: "",
      revenue: "",
      serviceChannels: "",
      monthlyInteractions: "",
      objectives: "",
      timeline: "",
      budget: "",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CompanyBasicsStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <OperationsStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <GoalsStep formData={formData} handleInputChange={handleInputChange} />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detailed Analysis for {industry}</DialogTitle>
          <DialogDescription>
            Step {step} of 3:{" "}
            {step === 1 ? "Company Basics" : step === 2 ? "Operations" : "Goals"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{renderStep()}</div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {step === 3 ? "Submit" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};