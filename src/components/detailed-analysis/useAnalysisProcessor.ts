import { AnalysisData } from "@/types/analysis";
import { DetailedAnalysisProps } from "./types";

export const useAnalysisProcessor = ({ industry, analysis }: Pick<DetailedAnalysisProps, 'industry' | 'analysis'>) => {
  const getProcessedAnalysis = (): AnalysisData => {
    console.log("DetailedAnalysisDialog - Processing analysis data:", analysis);
    
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
      console.log("DetailedAnalysisDialog - Using default analysis");
      return defaultAnalysis;
    }

    const processedAnalysis: AnalysisData = {
      industry: analysis.industry,
      department: analysis.department,
      bot_function: analysis.bot_function,
      savings: typeof analysis.savings === 'number' ? analysis.savings : 0,
      profit_increase: typeof analysis.profit_increase === 'number' ? analysis.profit_increase : 0,
      explanation: analysis.explanation,
      marketing_strategy: analysis.marketing_strategy
    };

    console.log("DetailedAnalysisDialog - Processed analysis:", processedAnalysis);
    return processedAnalysis;
  };

  return { getProcessedAnalysis };
};