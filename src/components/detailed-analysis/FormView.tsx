import { DetailedAnalysisForm } from "./DetailedAnalysisForm";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { DetailedFormData } from "@/types/analysis";

export interface FormViewProps {
  onSubmit: (data: DetailedFormData) => void;
  industry?: string;
  analysis?: any;
  initialData: DetailedFormData | null;
}

export const FormView = ({ onSubmit, industry, analysis, initialData }: FormViewProps) => {
  console.log("FormView - Render:", { 
    hasIndustry: !!industry, 
    hasAnalysis: !!analysis, 
    hasInitialData: !!initialData 
  });

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
          initialData={initialData}
        />
      </div>
    </>
  );
};