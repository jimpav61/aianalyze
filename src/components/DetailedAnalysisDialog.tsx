import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { CompanyBasicsStep } from "./detailed-analysis/CompanyBasicsStep";
import { OperationsStep } from "./detailed-analysis/OperationsStep";
import { GoalsStep } from "./detailed-analysis/GoalsStep";
import { DetailedReport } from "./DetailedReport";
import { useToast } from "./ui/use-toast";

interface DetailedAnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  };
}

export const DetailedAnalysisDialog = ({
  isOpen,
  onClose,
  analysis,
}: DetailedAnalysisDialogProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    phoneNumber: "",
    email: "",
    employees: "",
    revenue: "",
    serviceChannels: "",
    currentTools: "",
    painPoints: "",
    goals: "",
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

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    toast({
      title: "Analysis Complete",
      description: "Your detailed analysis report is ready.",
    });
    setShowReport(true);
  };

  const handleClose = () => {
    setFormData({
      companyName: "",
      phoneNumber: "",
      email: "",
      employees: "",
      revenue: "",
      serviceChannels: "",
      currentTools: "",
      painPoints: "",
      goals: "",
      timeline: "",
      budget: "",
      additionalInfo: "",
    });
    setCurrentStep(1);
    setShowReport(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px]">
        {!showReport ? (
          <>
            <DialogHeader>
              <DialogTitle>Detailed Analysis Request</DialogTitle>
            </DialogHeader>

            <div className="mt-4">
              {currentStep === 1 && (
                <CompanyBasicsStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {currentStep === 2 && (
                <OperationsStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {currentStep === 3 && (
                <GoalsStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button className="ml-auto" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button className="ml-auto" onClick={handleSubmit}>
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <DetailedReport data={formData} analysis={analysis} />
        )}
      </DialogContent>
    </Dialog>
  );
};