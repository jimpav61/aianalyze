import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Analysis = Database['public']['Tables']['analyses']['Row'];

export const generateAnalysis = async (industry: string) => {
  try {
    console.log('Fetching analysis for industry:', industry);
    
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .ilike('industry', `%${industry}%`);

    if (error) {
      console.error('Error fetching analysis:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No analysis found for industry:', industry);
      return [];
    }

    console.log('Fetched analysis data:', data);

    return data.map((item: Analysis) => ({
      id: item.id,
      department: item.department,
      function: item.bot_function,
      savings: `$${item.savings.toLocaleString()}/year`,
      profit: `+${item.profit_increase}%`,
      explanation: item.explanation,
      marketingStrategy: item.marketing_strategy,
    }));
  } catch (error) {
    console.error('Error in generateAnalysis:', error);
    throw error;
  }
};