import { supabase } from "@/integrations/supabase/client";

export const generateAnalysis = async (industry: string) => {
  console.log('Starting analysis for industry:', industry);
  
  try {
    console.log('Fetching data from Supabase for industry:', industry);
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

    console.log('Number of records found:', data.length);

    // Transform and validate each item
    const transformedData = data.map((item, index) => {
      console.log(`Processing item ${index + 1}:`, item);

      // Ensure all required fields are present and properly formatted
      const transformed = {
        id: item.id || `generated-${crypto.randomUUID()}`,
        department: item.department || 'Unknown Department',
        function: item.bot_function || 'Unknown Function',
        savings: (item.savings !== null && item.savings !== undefined) 
          ? item.savings.toString() 
          : '0',
        profit_increase: (item.profit_increase !== null && item.profit_increase !== undefined) 
          ? item.profit_increase.toString() 
          : '0',
        explanation: item.explanation || 'No explanation provided',
        marketingStrategy: item.marketing_strategy || 'No marketing strategy provided'
      };

      console.log(`Transformed item ${index + 1}:`, transformed);
      return transformed;
    });

    console.log('Final transformed data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error in generateAnalysis:', error);
    throw error;
  }
};