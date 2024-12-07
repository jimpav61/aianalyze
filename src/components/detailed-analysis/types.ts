import { DetailedFormData, AnalysisData } from "@/types/analysis";

export interface DetailedAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
  industry?: string;
  analysis?: {
    id: string;
    industry: string;
    department: string;
    function?: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  } | null;
}

export interface ProcessedAnalysisResult {
  defaultAnalysis: AnalysisData;
  processedAnalysis: AnalysisData;
}