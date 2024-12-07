import { AnalysisData } from "@/types/analysis";
import { DetailedAnalysisProps } from "./types";

export const useAnalysisProcessor = ({ industry, analysis }: Pick<DetailedAnalysisProps, 'industry' | 'analysis'>) => {
  const getProcessedAnalysis = (): AnalysisData => {
    console.log("useAnalysisProcessor - Processing analysis data:", { industry, analysis });
    
    const defaultAnalysis: AnalysisData = {
      industry: industry || "Unknown Industry",
      department: "General",
      bot_function: "General Automation",
      savings: 0,
      profit_increase: 0,
      explanation: "Custom implementation strategy",
      marketing_strategy: "Custom marketing strategy",
    };

    if (!analysis) {
      console.log("useAnalysisProcessor - No analysis provided, using default");
      return defaultAnalysis;
    }

    // Map the fields correctly, ensuring we handle the 'function' to 'bot_function' mapping
    const processedAnalysis: AnalysisData = {
      industry: industry || defaultAnalysis.industry, // Use the passed industry
      department: analysis.department || defaultAnalysis.department,
      bot_function: analysis.function || analysis.bot_function || defaultAnalysis.bot_function, // Handle both field names
      savings: Number(analysis.savings) || defaultAnalysis.savings,
      profit_increase: Number(analysis.profit_increase) || defaultAnalysis.profit_increase,
      explanation: analysis.explanation || defaultAnalysis.explanation,
      marketing_strategy: analysis.marketingStrategy || analysis.marketing_strategy || defaultAnalysis.marketing_strategy // Handle both field names
    };

    console.log("useAnalysisProcessor - Processed analysis:", processedAnalysis);
    return processedAnalysis;
  };

  return { getProcessedAnalysis };
};