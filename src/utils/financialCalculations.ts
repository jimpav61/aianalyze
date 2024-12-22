interface FinancialFactors {
  savingsPercent: number;
  profitPercent: number;
}

interface FinancialResults {
  savings: {
    amount: number;
    percentage: number;
  };
  profit: {
    amount: number;
    percentage: number;
  };
}

export const getDepartmentFactors = (): Record<string, FinancialFactors> => ({
  'Customer Service': {
    savingsPercent: 25,
    profitPercent: 8
  },
  'Marketing': {
    savingsPercent: 15,
    profitPercent: 12
  },
  'Sales': {
    savingsPercent: 20,
    profitPercent: 15
  }
});

const getScaledFactors = (baseFactors: FinancialFactors, revenue: number): FinancialFactors => {
  let scale = 1;
  if (revenue < 50000) {
    scale = 1.2; // Higher percentage impact for smaller businesses
  } else if (revenue > 1000000) {
    scale = 0.8; // Lower percentage but higher absolute numbers for larger businesses
  }
  
  return {
    savingsPercent: baseFactors.savingsPercent * scale,
    profitPercent: baseFactors.profitPercent * scale
  };
};

export const calculateRevenue = (revenueStr: string): number => {
  if (revenueStr.includes('million')) {
    if (revenueStr.includes('1 million+')) {
      return 1000000;
    }
    const match = revenueStr.match(/\$(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) * 1000000 : 0;
  }

  const matches = revenueStr.match(/\$(\d+(?:,\d{3})*)/g);
  if (matches && matches.length >= 1) {
    if (matches.length === 2) {
      const lowerBound = parseFloat(matches[0].replace(/[$,]/g, ''));
      const upperBound = parseFloat(matches[1].replace(/[$,]/g, ''));
      return (lowerBound + upperBound) / 2;
    }
    return parseFloat(matches[0].replace(/[$,]/g, ''));
  }
  return 0;
};

export const calculateFinancials = (revenue: number, department: string): FinancialResults => {
  if (revenue === 0) {
    return {
      savings: { amount: 0, percentage: 0 },
      profit: { amount: 0, percentage: 0 }
    };
  }

  const departmentFactors = getDepartmentFactors();
  const baseFactors = departmentFactors[department] || {
    savingsPercent: 10,
    profitPercent: 5
  };
  
  const scaledFactors = getScaledFactors(baseFactors, revenue);

  const savingsAmount = Math.round(revenue * (scaledFactors.savingsPercent / 100));
  const savingsPercentage = parseFloat(scaledFactors.savingsPercent.toFixed(1));
  
  const profitPercentage = parseFloat(scaledFactors.profitPercent.toFixed(1));
  const profitAmount = Math.round(revenue * (profitPercentage / 100));

  return {
    savings: {
      amount: savingsAmount,
      percentage: savingsPercentage
    },
    profit: {
      amount: profitAmount,
      percentage: profitPercentage
    }
  };
};