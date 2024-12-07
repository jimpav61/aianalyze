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

    // Map the fields correctly, handling both camelCase and snake_case variations
    const processedAnalysis: AnalysisData = {
      industry: industry || defaultAnalysis.industry,
      department: analysis.department || defaultAnalysis.department,
      bot_function: analysis.bot_function || analysis.function || defaultAnalysis.bot_function,
      savings: Number(analysis.savings) || defaultAnalysis.savings,
      profit_increase: Number(analysis.profit_increase) || defaultAnalysis.profit_increase,
      explanation: analysis.explanation || defaultAnalysis.explanation,
      marketing_strategy: analysis.marketingStrategy || analysis.marketing_strategy || defaultAnalysis.marketing_strategy
    };

    console.log("useAnalysisProcessor - Raw analysis:", analysis);
    console.log("useAnalysisProcessor - Processed analysis:", processedAnalysis);

    // Validate all required fields are present
    const requiredFields = ['industry', 'department', 'bot_function', 'savings', 'profit_increase', 'explanation', 'marketing_strategy'];
    const missingFields = requiredFields.filter(field => !processedAnalysis[field as keyof AnalysisData]);
    
    if (missingFields.length > 0) {
      console.error("useAnalysisProcessor - Missing required fields:", missingFields);
      console.error("useAnalysisProcessor - Current values:", processedAnalysis);
    }

    return processedAnalysis;
  };

  return { getProcessedAnalysis };
};