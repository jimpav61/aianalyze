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
    allAnalyses?: any[];
    formData?: DetailedFormData;
  } | null;
}