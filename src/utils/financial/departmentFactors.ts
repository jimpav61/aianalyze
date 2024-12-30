export const getDepartmentFactors = (department: string) => {
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