import { supabase } from "@/integrations/supabase/client";

export const generateAnalysis = async (industry: string) => {
  console.log('Starting analysis for industry:', industry);
  
  try {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('industry', industry)
      .order('department');
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Raw data from Supabase:', data);
    
    if (!data || data.length === 0) {
      console.log('No analysis found for industry:', industry);
      return [];
    }

    // Transform the data to match the expected format in AnalysisCard
    const transformedData = data.map(item => ({
      id: item.id,
      department: item.department,
      function: item.bot_function,
      savings: item.savings?.toString() || "0",
      profit_increase: item.profit_increase?.toString() || "0",
      explanation: item.explanation || "",
      marketingStrategy: item.marketing_strategy || ""
    }));

    console.log('Transformed data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error in generateAnalysis:', error);
    throw error;
  }
};