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

    const processedAnalysis: AnalysisData = {
      industry: analysis.industry || defaultAnalysis.industry,
      department: analysis.department || defaultAnalysis.department,
      bot_function: analysis.bot_function || defaultAnalysis.bot_function,
      savings: typeof analysis.savings === 'number' ? analysis.savings : defaultAnalysis.savings,
      profit_increase: typeof analysis.profit_increase === 'number' ? analysis.profit_increase : defaultAnalysis.profit_increase,
      explanation: analysis.explanation || defaultAnalysis.explanation,
      marketing_strategy: analysis.marketing_strategy || defaultAnalysis.marketing_strategy
    };

    console.log("useAnalysisProcessor - Processed analysis:", processedAnalysis);
    return processedAnalysis;
  };

  return { getProcessedAnalysis };
};