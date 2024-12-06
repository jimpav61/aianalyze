import { supabase } from "@/integrations/supabase/client";

export const generateAnalysis = async (industry: string) => {
  console.log('Starting analysis for industry:', industry);
  
  try {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('industry', industry);
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Analysis data retrieved:', data);
    
    if (!data || data.length === 0) {
      console.log('No analysis found for industry:', industry);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in generateAnalysis:', error);
    throw error;
  }
};