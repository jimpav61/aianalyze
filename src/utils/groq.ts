import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Analysis = Database['public']['Tables']['analyses']['Row'];

export const generateAnalysis = async (industry: string) => {
  try {
    console.log('Starting analysis generation for industry:', industry);
    
    if (!industry) {
      console.error('No industry provided');
      return [];
    }

    // Add more specific logging for the Supabase query
    console.log('Executing Supabase query for industry:', industry);
    
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .ilike('industry', `%${industry}%`);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data) {
      console.log('No data returned from Supabase');
      return [];
    }

    console.log(`Found ${data.length} analyses for industry:`, industry);
    console.log('Raw data:', data);

    const formattedData = data.map((item: Analysis) => ({
      id: item.id,
      department: item.department,
      function: item.bot_function,
      savings: `$${item.savings.toLocaleString()}/year`,
      profit: `+${item.profit_increase}%`,
      explanation: item.explanation,
      marketingStrategy: item.marketing_strategy,
    }));

    console.log('Formatted data:', formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error in generateAnalysis:', error);
    throw error;
  }
};