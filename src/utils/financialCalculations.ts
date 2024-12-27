export const calculateRevenue = (revenueStr: string): number => {
  if (!revenueStr) return 0;
  
  // Handle "X million+" cases
  if (revenueStr.toLowerCase().includes('million')) {
    const match = revenueStr.match(/(\d+)\s*million/i);
    return match ? parseFloat(match[1]) * 1000000 : 1000000;
  }

  // Handle ranges like "$100,000 - $500,000"
  const matches = revenueStr.match(/\$?(\d+(?:,\d{3})*(?:\.\d+)?)/g);
  if (matches && matches.length >= 1) {
    const numbers = matches.map(str => parseFloat(str.replace(/[$,]/g, '')));
    if (numbers.length === 2) {
      return Math.round((numbers[0] + numbers[1]) / 2);
    }
    return numbers[0];
  }

  // Handle plain numbers
  const plainNumber = parseFloat(revenueStr.replace(/[$,]/g, ''));
  if (!isNaN(plainNumber)) {
    return plainNumber;
  }

  return 0;
};

const getBaseFactors = (department: string) => {
  const factors: { [key: string]: { savingsPercent: number; profitPercent: number } } = {
    'Customer Service': { savingsPercent: 25, profitPercent: 12 },
    'Marketing': { savingsPercent: 20, profitPercent: 15 },
    'Sales': { savingsPercent: 30, profitPercent: 20 },
    'Operations': { savingsPercent: 35, profitPercent: 18 },
    'Human Resources': { savingsPercent: 22, profitPercent: 10 },
    'Finance': { savingsPercent: 18, profitPercent: 12 },
    'IT': { savingsPercent: 40, profitPercent: 25 },
    'Legal': { savingsPercent: 15, profitPercent: 8 },
    'Manufacturing': { savingsPercent: 28, profitPercent: 16 },
    'Supply Chain': { savingsPercent: 32, profitPercent: 18 },
    'Research & Development': { savingsPercent: 20, profitPercent: 15 },
    'Client Services': { savingsPercent: 25, profitPercent: 15 },
    'Design Studio': { savingsPercent: 30, profitPercent: 20 },
    'Project Management': { savingsPercent: 28, profitPercent: 18 },
    'Resource Planning': { savingsPercent: 25, profitPercent: 15 }
  };
  return factors[department] || { savingsPercent: 20, profitPercent: 10 };
};

const getIndustryMultiplier = (industry: string): number => {
  const multipliers: { [key: string]: number } = {
    'Technology': 1.4,
    'Healthcare': 1.2,
    'Manufacturing': 1.3,
    'Retail': 0.9,
    'Financial Services': 1.35,
    'Education': 0.8,
    'Real Estate': 0.95,
    'Construction': 1.1,
    'Transportation': 1.15,
    'Energy': 1.4,
    'Agriculture': 0.85,
    'Hospitality': 0.9,
    'Professional Services': 1.25,
    'Media & Entertainment': 1.2,
    'Telecommunications': 1.3,
    'Architecture & Design': 1.3
  };
  return multipliers[industry] || 1.0;
};

const getScalingFactor = (revenue: number) => {
  if (revenue >= 100000000) return 0.6; // Very large enterprise
  if (revenue >= 50000000) return 0.7; // Large enterprise
  if (revenue >= 10000000) return 0.8; // Medium-large business
  if (revenue >= 5000000) return 0.9; // Medium business
  if (revenue >= 1000000) return 1.0; // Small-medium business
  if (revenue >= 500000) return 1.1; // Small business
  return 1.2; // Very small business (higher relative impact)
};

export const calculateFinancials = (revenue: number, department: string, industry?: string) => {
  const baseFactors = getBaseFactors(department);
  const scalingFactor = getScalingFactor(revenue);
  const industryMultiplier = industry ? getIndustryMultiplier(industry) : 1.0;

  // Calculate adjusted percentages based on all factors
  const adjustedSavingsPercent = baseFactors.savingsPercent * scalingFactor * industryMultiplier;
  const adjustedProfitPercent = baseFactors.profitPercent * scalingFactor * industryMultiplier;

  // Calculate final amounts
  const savingsAmount = Math.round(revenue * (adjustedSavingsPercent / 100));
  const profitAmount = Math.round(revenue * (adjustedProfitPercent / 100));

  console.log('Financial calculation details:', {
    revenue,
    department,
    industry,
    baseFactors,
    scalingFactor,
    industryMultiplier,
    adjustedSavingsPercent,
    adjustedProfitPercent,
    results: {
      savingsAmount,
      savingsPercentage: adjustedSavingsPercent,
      profitPercentage: adjustedProfitPercent,
      profitAmount
    }
  });

  return {
    savingsAmount,
    savingsPercentage: parseFloat(adjustedSavingsPercent.toFixed(1)),
    profitPercentage: parseFloat(adjustedProfitPercent.toFixed(1)),
    profitAmount
  };
};