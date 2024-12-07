import { supabase } from "@/integrations/supabase/client";

export const generateAnalysis = async (industry: string) => {
  console.log('Starting analysis for industry:', industry);
  
  try {
    // Fetch data with explicit ordering
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

    // Validate and transform each item
    const transformedData = data.map(item => {
      // Validate required fields
      if (!item.department || !item.bot_function) {
        console.warn('Missing required fields for item:', item);
        return null;
      }

      // Transform the data ensuring all fields are properly formatted
      return {
        id: item.id || crypto.randomUUID(),
        department: item.department,
        function: item.bot_function,
        savings: typeof item.savings === 'number' ? item.savings.toString() : '0',
        profit_increase: typeof item.profit_increase === 'number' ? item.profit_increase.toString() : '0',
        explanation: item.explanation || 'No explanation provided',
        marketingStrategy: item.marketing_strategy || 'No marketing strategy provided'
      };
    }).filter(item => item !== null); // Remove any invalid items

    console.log('Transformed data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error in generateAnalysis:', error);
    throw error;
  }
};