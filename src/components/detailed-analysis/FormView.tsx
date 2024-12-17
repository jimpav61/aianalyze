import { DetailedAnalysisForm } from "./DetailedAnalysisForm";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { DetailedFormData } from "@/types/analysis";

interface FormViewProps {
  onSubmit: (data: DetailedFormData) => void;
  industry?: string;
  analysis?: any;
}

export const FormView = ({ onSubmit, industry, analysis }: FormViewProps) => {
  console.log("FormView - Render:", { hasIndustry: !!industry, hasAnalysis: !!analysis });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Detailed Analysis Request</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <DetailedAnalysisForm 
          onSubmit={onSubmit} 
          industry={industry}
          analysis={analysis}
        />
      </div>
    </>
  );
};