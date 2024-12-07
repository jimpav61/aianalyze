import { supabase } from "@/integrations/supabase/client";

export const generateAnalysis = async (industry: string) => {
  console.log('generateAnalysis - Starting analysis for industry:', industry);
  
  try {
    console.log('generateAnalysis - Fetching data from Supabase');
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('industry', industry)
      .order('department');
    
    if (error) {
      console.error('generateAnalysis - Supabase error:', error);
      throw error;
    }

    console.log('generateAnalysis - Raw data from Supabase:', data);
    
    if (!data || data.length === 0) {
      console.log('generateAnalysis - No data found for industry:', industry);
      return [];
    }

    console.log('generateAnalysis - Processing', data.length, 'records');

    // Transform and validate each item
    const transformedData = data.map((item, index) => {
      console.log(`generateAnalysis - Processing item ${index + 1}:`, item);

      if (!item) {
        console.warn('generateAnalysis - Invalid item:', item);
        return null;
      }

      // Validate required fields
      const requiredFields = ['department', 'bot_function', 'savings', 'profit_increase', 'explanation', 'marketing_strategy'];
      const missingFields = requiredFields.filter(field => !item[field] && item[field] !== 0);
      
      if (missingFields.length > 0) {
        console.warn(`generateAnalysis - Missing required fields for item ${index + 1}:`, missingFields);
        return null;
      }

      // Transform the data with strict type checking
      const transformed = {
        id: item.id || `generated-${crypto.randomUUID()}`,
        department: String(item.department),
        bot_function: String(item.bot_function),
        savings: String(item.savings || 0),
        profit_increase: String(item.profit_increase || 0),
        explanation: String(item.explanation),
        marketing_strategy: String(item.marketing_strategy)
      };

      console.log(`generateAnalysis - Transformed item ${index + 1}:`, transformed);
      return transformed;
    }).filter(Boolean); // Remove null items

    console.log('generateAnalysis - Final transformed data:', transformedData);
    
    if (transformedData.length === 0) {
      console.warn('generateAnalysis - No valid items after transformation');
      return [];
    }

    return transformedData;
  } catch (error) {
    console.error('generateAnalysis - Error:', error);
    throw error;
  }
};