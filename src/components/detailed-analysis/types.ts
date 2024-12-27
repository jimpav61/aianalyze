import { DetailedFormData } from "@/types/analysis";

export interface DetailedAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
  industry?: string;
  analysis?: {
    id?: string;
    industry: string;
    department: string;
    function?: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
    allAnalyses?: any[]; // Add this field to support multiple analyses
  } | null;
}

export interface ProcessedAnalysisResult {
  defaultAnalysis: AnalysisData;
  processedAnalysis: AnalysisData;
}

export interface AnalysisData {
  industry: string;
  department: string;
  bot_function: string;
  savings: number;
  profit_increase: number;
  explanation: string;
  marketing_strategy: string;
}