import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter your company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                name="employees"
                type="number"
                value={formData.employees}
                onChange={handleInputChange}
                placeholder="e.g., 50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue">Annual Revenue (USD)</Label>
              <Input
                id="revenue"
                name="revenue"
                type="number"
                value={formData.revenue}
                onChange={handleInputChange}
                placeholder="e.g., 1000000"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceChannels">Current Service Channels</Label>
              <Input
                id="serviceChannels"
                name="serviceChannels"
                value={formData.serviceChannels}
                onChange={handleInputChange}
                placeholder="e.g., Email, Phone, Chat"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyInteractions">Monthly Customer Interactions</Label>
              <Input
                id="monthlyInteractions"
                name="monthlyInteractions"
                type="number"
                value={formData.monthlyInteractions}
                onChange={handleInputChange}
                placeholder="e.g., 1000"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="objectives">Key Objectives</Label>
              <Input
                id="objectives"
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
                placeholder="What are your main goals?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Implementation Timeline</Label>
              <Input
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                placeholder="e.g., 3 months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget (USD)</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g., 50000"
              />
            </div>
          </div>
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
            Step {step} of 3: {step === 1 ? "Company Basics" : step === 2 ? "Operations" : "Goals"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{renderStep()}</div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
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