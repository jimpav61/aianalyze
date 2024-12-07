import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { CompanyBasicsStep } from "./detailed-analysis/CompanyBasicsStep";
import { OperationsStep } from "./detailed-analysis/OperationsStep";
import { GoalsStep } from "./detailed-analysis/GoalsStep";
import { DetailedReport } from "./DetailedReport";
import { useToast } from "./ui/use-toast";
import { FormStepNavigator } from "./detailed-analysis/FormStepNavigator";

interface DetailedAnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  industry?: string;
  analysis?: {
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
  industry,
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

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

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
      monthlyInteractions: "",
      currentTools: "",
      painPoints: "",
      objectives: "",
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
      <DialogContent className="sm:max-w-[900px] h-[80vh]">
        {!showReport ? (
          <>
            <DialogHeader>
              <DialogTitle>Detailed Analysis Request</DialogTitle>
            </DialogHeader>

            <div className="mt-4">
              <ScrollArea className="h-[calc(80vh-10rem)] pr-4">
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
              </ScrollArea>

              <FormStepNavigator
                currentStep={currentStep}
                onNext={handleNext}
                onBack={handleBack}
                onSubmit={handleSubmit}
              />
            </div>
          </>
        ) : (
          <ScrollArea className="h-[calc(80vh-2rem)]">
            <DetailedReport data={formData} analysis={analysis} />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};