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

    // Always show sample data if no data exists for the industry
    if (!data || data.length === 0) {
      console.log('generateAnalysis - No data found for industry:', industry);
      
      // Sample data for display
      const sampleAnalyses = [
        {
          industry,
          department: "Customer Service",
          bot_function: "24/7 Customer Support Automation",
          savings: 45000,
          profit_increase: 15,
          explanation: "Implementation of AI chatbot system to handle customer inquiries and support tickets automatically, reducing response time and staff workload.",
          marketing_strategy: "Enhance customer experience with instant support availability and consistent service quality."
        },
        {
          industry,
          department: "Sales",
          bot_function: "Lead Qualification & Scoring",
          savings: 35000,
          profit_increase: 12,
          explanation: "AI-powered lead scoring system to automatically qualify and prioritize sales leads, improving conversion rates and sales efficiency.",
          marketing_strategy: "Accelerate sales cycle and improve prospect engagement through intelligent lead nurturing."
        },
        {
          industry,
          department: "Marketing",
          bot_function: "Content Personalization",
          savings: 25000,
          profit_increase: 10,
          explanation: "AI-driven content personalization engine to deliver targeted marketing messages and recommendations to different customer segments.",
          marketing_strategy: "Increase engagement and conversion rates through personalized customer experiences."
        }
      ];

      // Return the sample data directly without inserting into database
      return sampleAnalyses.map(item => ({
        id: crypto.randomUUID(),
        department: item.department,
        function: item.bot_function,
        savings: item.savings.toString(),
        profit_increase: item.profit_increase.toString(),
        explanation: item.explanation,
        marketingStrategy: item.marketing_strategy
      }));
    }

    console.log('generateAnalysis - Processing', data.length, 'records');

    // Transform and validate each item
    const transformedData = data.map(item => {
      if (!item) return null;

      return {
        id: item.id,
        department: item.department,
        function: item.bot_function,
        savings: item.savings.toString(),
        profit_increase: item.profit_increase.toString(),
        explanation: item.explanation,
        marketingStrategy: item.marketing_strategy
      };
    }).filter(Boolean);

    console.log('generateAnalysis - Final transformed data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('generateAnalysis - Error:', error);
    throw error;
  }
};