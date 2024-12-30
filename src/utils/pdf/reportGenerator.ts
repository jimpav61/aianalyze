import { DetailedFormData } from "@/types/analysis";
import { generateFullReport } from "@/utils/pdf/reportHandler";

export const generateAnalysisReport = async ({ formData, analysis }: { 
  formData: DetailedFormData;
  analysis: any;
}) => {
  return generateFullReport({ formData, analysis });
};