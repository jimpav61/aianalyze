import { supabase } from "@/integrations/supabase/client";

export const generateAnalysis = async (industry: string) => {
  console.log('generateAnalysis - Starting analysis for industry:', industry);
  
  try {
    console.log('generateAnalysis - Fetching data from Supabase');
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('industry', industry);
    
    if (error) {
      console.error('generateAnalysis - Supabase error:', error);
      throw error;
    }

    console.log('generateAnalysis - Raw data from Supabase:', data);
    
    if (!data || data.length === 0) {
      console.log('generateAnalysis - No data found for industry:', industry);
      return [];
    }

    // Transform the data to match the expected format
    const transformedData = data.map(item => ({
      id: item.id,
      department: item.department,
      function: item.bot_function,
      savings: item.savings.toString(),
      profit_increase: item.profit_increase.toString(),
      explanation: item.explanation,
      marketingStrategy: item.marketing_strategy
    }));

    console.log('generateAnalysis - Transformed data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('generateAnalysis - Error:', error);
    throw error;
  }
};