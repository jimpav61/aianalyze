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

    // Generate analyses for different departments based on form data
    const departments = [
      { name: "Client Services", focus: "customer interaction and support" },
      { name: "Project Management", focus: "project coordination and delivery" },
      { name: "Design Studio", focus: "creative and design processes" },
      { name: "Resource Planning", focus: "resource allocation and scheduling" }
    ];

    const analyses = departments.map(dept => {
      const savings = calculateSavings(formData.revenue, dept.name);
      const profitIncrease = calculateProfitIncrease(formData.revenue, dept.name);
      
      return {
        department: dept.name,
        bot_function: generateBotFunction(dept, formData),
        savings: savings,
        profit_increase: profitIncrease,
        explanation: generateExplanation(dept, formData),
        marketing_strategy: generateMarketingStrategy(dept, formData)
      };
    });

    // Store analyses in the database
    const { data: storedAnalyses, error } = await supabaseAdmin.from('analyses')
      .insert(analyses.map(analysis => ({
        ...analysis,
        industry: formData.industry
      })))
      .select();

    if (error) throw error;

    return new Response(JSON.stringify({ analyses: storedAnalyses }), {
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

function calculateSavings(revenue: string, department: string): number {
  const baseRevenue = parseInt(revenue.replace(/[^0-9]/g, ''));
  const savingsPercentages: { [key: string]: number } = {
    "Client Services": 0.15,
    "Project Management": 0.12,
    "Design Studio": 0.10,
    "Resource Planning": 0.08
  };
  return Math.round(baseRevenue * (savingsPercentages[department] || 0.10));
}

function calculateProfitIncrease(revenue: string, department: string): number {
  const baseRevenue = parseInt(revenue.replace(/[^0-9]/g, ''));
  const profitPercentages: { [key: string]: number } = {
    "Client Services": 25,
    "Project Management": 20,
    "Design Studio": 18,
    "Resource Planning": 15
  };
  return profitPercentages[department] || 15;
}

function generateBotFunction(dept: { name: string, focus: string }, formData: any): string {
  const painPoints = formData.painPoints.split(', ');
  const tools = formData.currentTools.split(', ');
  
  return `AI-powered ${dept.focus} automation system that addresses ${painPoints[0]} and integrates with ${tools[0]}, optimizing ${dept.name.toLowerCase()} operations.`;
}

function generateExplanation(dept: { name: string, focus: string }, formData: any): string {
  const monthlyVolume = formData.monthlyInteractions;
  const timeline = formData.timeline;
  
  return `Based on your ${monthlyVolume} monthly interactions and current tools, we recommend implementing an AI system in the ${dept.name} department within a ${timeline} timeline. This will streamline ${dept.focus}, reducing manual work and improving efficiency.`;
}

function generateMarketingStrategy(dept: { name: string, focus: string }, formData: any): string {
  const objectives = formData.objectives;
  const budget = formData.budget;
  
  return `Leverage the AI implementation in ${dept.name} to showcase innovation and efficiency in ${dept.focus}. With a ${budget} budget allocation, focus on achieving ${objectives} while maintaining competitive advantage.`;
}