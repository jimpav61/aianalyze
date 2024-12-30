export const calculateRevenue = (revenueStr: string): number => {
  if (!revenueStr) return 0;
  
  // Handle "X million+" cases
  if (revenueStr.toLowerCase().includes('million')) {
    const match = revenueStr.match(/(\d+)\s*million/i);
    return match ? parseFloat(match[1]) * 1000000 : 1000000;
  }

  // Handle ranges like "$100,000 - $500,000"
  const matches = revenueStr.match(/\$(\d+(?:,\d{3})*)/g);
  if (matches && matches.length >= 1) {
    if (matches.length === 2) {
      // Take average of range
      const lowerBound = parseFloat(matches[0].replace(/[$,]/g, ''));
      const upperBound = parseFloat(matches[1].replace(/[$,]/g, ''));
      return (lowerBound + upperBound) / 2;
    }
    return parseFloat(matches[0].replace(/[$,]/g, ''));
  }
  return 0;
};

const getBaseFactors = (department: string) => {
  const factors: { [key: string]: { savingsPercent: number; profitPercent: number } } = {
    'Customer Service': { savingsPercent: 15, profitPercent: 8 },
    'Marketing': { savingsPercent: 12, profitPercent: 7 },
    'Sales': { savingsPercent: 14, profitPercent: 9 },
    'Operations': { savingsPercent: 18, profitPercent: 10 },
    'Human Resources': { savingsPercent: 10, profitPercent: 6 },
    'Finance': { savingsPercent: 8, profitPercent: 5 },
    'IT': { savingsPercent: 20, profitPercent: 12 },
    'Legal': { savingsPercent: 6, profitPercent: 4 },
    'Manufacturing': { savingsPercent: 16, profitPercent: 9 },
    'Supply Chain': { savingsPercent: 14, profitPercent: 8 },
    'Research & Development': { savingsPercent: 10, profitPercent: 6 },
    'Client Services': { savingsPercent: 12, profitPercent: 7 },
    'Design Studio': { savingsPercent: 14, profitPercent: 8 },
    'Project Management': { savingsPercent: 12, profitPercent: 7 },
    'Resource Planning': { savingsPercent: 10, profitPercent: 6 }
  };
  return factors[department] || { savingsPercent: 10, profitPercent: 6 };
};

const getIndustryMultiplier = (industry: string): number => {
  const multipliers: { [key: string]: number } = {
    'Technology': 1.2,
    'Healthcare': 1.15,
    'Manufacturing': 1.15,
    'Retail': 1.0,
    'Financial Services': 1.25,
    'Education': 0.95,
    'Real Estate': 1.05,
    'Construction': 1.1,
    'Transportation': 1.1,
    'Energy': 1.2,
    'Agriculture': 0.95,
    'Hospitality': 1.0,
    'Professional Services': 1.15,
    'Media & Entertainment': 1.1,
    'Telecommunications': 1.15,
    'Architecture & Design': 1.1
  };
  return multipliers[industry] || 1.0;
};

const getScalingFactor = (revenue: number) => {
  if (revenue >= 10000000) return 0.85; // Very large enterprise
  if (revenue >= 5000000) return 0.9; // Large enterprise
  if (revenue >= 1000000) return 0.95; // Medium-large business
  if (revenue >= 500000) return 1.0; // Medium business
  if (revenue >= 100000) return 1.05; // Small-medium business
  return 1.1; // Small business
};

export const calculateFinancials = (revenue: number, department: string, industry?: string) => {
  if (!revenue || revenue <= 0) {
    console.warn('Invalid revenue value:', revenue);
    return {
      savingsAmount: 0,
      savingsPercentage: 0,
      profitPercentage: 0,
      profitAmount: 0
    };
  }

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