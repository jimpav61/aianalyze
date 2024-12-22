export const getBaseFactors = (department: string) => {
  const factors = {
    'Customer Service': { savingsPercent: 15, profitPercent: 8 },
    'Marketing': { savingsPercent: 12, profitPercent: 10 },
    'Sales': { savingsPercent: 18, profitPercent: 15 },
    'Operations': { savingsPercent: 20, profitPercent: 12 },
    'Human Resources': { savingsPercent: 15, profitPercent: 8 },
    'Finance': { savingsPercent: 12, profitPercent: 10 },
    'IT': { savingsPercent: 25, profitPercent: 15 },
    'Legal': { savingsPercent: 10, profitPercent: 5 },
  };
  return factors[department as keyof typeof factors] || factors['Customer Service'];
};

const getScalingFactor = (revenue: number) => {
  if (revenue >= 10000000) return 0.7; // Scale down for very large companies
  if (revenue >= 5000000) return 0.8;
  if (revenue >= 1000000) return 0.9;
  return 1; // No scaling for smaller companies
};

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
      const lowerBound = parseFloat(matches[0].replace(/[$,]/g, ''));
      const upperBound = parseFloat(matches[1].replace(/[$,]/g, ''));
      return Math.round((lowerBound + upperBound) / 2);
    }
    return parseFloat(matches[0].replace(/[$,]/g, ''));
  }
  return 0;
};

export const calculateFinancials = (revenue: number, department: string) => {
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
  const scaledFactors = {
    savingsPercent: baseFactors.savingsPercent * scalingFactor,
    profitPercent: baseFactors.profitPercent * scalingFactor
  };

  const savingsAmount = Math.round(revenue * (scaledFactors.savingsPercent / 100));
  const savingsPercentage = parseFloat(scaledFactors.savingsPercent.toFixed(1));
  const profitPercentage = parseFloat(scaledFactors.profitPercent.toFixed(1));
  const profitAmount = Math.round(revenue * (profitPercentage / 100));

  return {
    savingsAmount,
    savingsPercentage,
    profitPercentage,
    profitAmount
  };
};