import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData } = await req.json();
    console.log("Received form data:", formData);

    // Calculate base metrics based on revenue and industry
    const baseRevenue = parseInt(formData.revenue.replace(/[^0-9]/g, ''));
    const industryMultipliers = {
      "Technology": { savings: 1.4, profit: 1.5 },
      "Healthcare": { savings: 1.2, profit: 1.3 },
      "Manufacturing": { savings: 1.3, profit: 1.2 },
      "Retail": { savings: 0.9, profit: 1.1 },
      "Financial Services": { savings: 1.35, profit: 1.4 },
      // Add more industry multipliers as needed
    };

    const multiplier = industryMultipliers[formData.industry] || { savings: 1.0, profit: 1.0 };

    // Generate analyses for different departments based on form data and industry
    const departments = [
      { 
        name: "Customer Service",
        focus: "customer interaction and support",
        baseSavings: 0.25,
        baseProfit: 0.12
      },
      { 
        name: "Operations",
        focus: "operational efficiency and automation",
        baseSavings: 0.35,
        baseProfit: 0.18
      },
      { 
        name: "Sales",
        focus: "sales process optimization",
        baseSavings: 0.30,
        baseProfit: 0.20
      }
    ];

    const analyses = departments.map(dept => {
      const savings = Math.round(baseRevenue * dept.baseSavings * multiplier.savings);
      const profitIncrease = Math.round(dept.baseProfit * multiplier.profit * 100);
      
      return {
        department: dept.name,
        bot_function: generateBotFunction(dept, formData),
        savings: savings,
        profit_increase: profitIncrease,
        explanation: generateExplanation(dept, formData, savings),
        marketing_strategy: generateMarketingStrategy(dept, formData, profitIncrease)
      };
    });

    console.log("Generated analyses:", analyses);

    return new Response(JSON.stringify({ analyses }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateBotFunction(dept: any, formData: any): string {
  const painPoints = formData.painPoints?.split(',') || [];
  const tools = formData.currentTools?.split(',') || [];
  
  return `AI-powered ${dept.focus} system that addresses ${
    painPoints[0] || 'efficiency challenges'
  } and integrates with ${
    tools[0] || 'existing tools'
  }, optimizing ${dept.name.toLowerCase()} processes with industry-specific solutions for ${formData.industry}.`;
}

function generateExplanation(dept: any, formData: any, savings: number): string {
  const monthlyVolume = formData.monthlyInteractions || '1000+';
  const timeline = formData.timeline || '3-6 months';
  
  return `Based on your ${monthlyVolume} monthly interactions in the ${formData.industry} industry, we recommend implementing an AI system in the ${dept.name} department within a ${timeline} timeline. This implementation is projected to save approximately $${savings.toLocaleString()} annually by streamlining ${dept.focus}, reducing manual work, and improving efficiency.`;
}

function generateMarketingStrategy(dept: any, formData: any, profitIncrease: number): string {
  const objectives = formData.objectives || 'efficiency improvement';
  const budget = formData.budget || 'planned investment';
  
  return `Leverage the AI implementation in ${dept.name} to showcase innovation and efficiency in ${dept.focus} within the ${formData.industry} sector. With a ${budget} budget allocation, focus on achieving ${objectives} while maintaining competitive advantage. Projected ${profitIncrease}% profit increase through optimized processes and enhanced customer experience.`;
}