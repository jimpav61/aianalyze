import { supabase } from "@/integrations/supabase/client";

interface Analysis {
  id: string;
  department: string;
  bot_function: string;
  savings: number;
  profit_increase: number;
  explanation: string;
  marketing_strategy: string;
}

export const generateAnalysis = async (industry: string) => {
  try {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('industry', industry);

    if (error) throw error;

    if (!data) return [];

    // Transform the data to match our frontend format
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
    console.error('Error fetching analysis:', error);
    throw error;
  }
};