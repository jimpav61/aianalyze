// Department-specific base factors
interface DepartmentFactors {
  savingsPercent: number;
  profitPercent: number;
}

export const getBaseFactors = (department: string): DepartmentFactors => {
  const factors: { [key: string]: DepartmentFactors } = {
    'Customer Service': { savingsPercent: 15, profitPercent: 8 },
    'Marketing': { savingsPercent: 12, profitPercent: 10 },
    'Sales': { savingsPercent: 18, profitPercent: 12 },
    'Operations': { savingsPercent: 20, profitPercent: 15 },
    'Human Resources': { savingsPercent: 12, profitPercent: 6 },
    'Finance': { savingsPercent: 10, profitPercent: 8 },
    'IT': { savingsPercent: 25, profitPercent: 18 },
    'Legal': { savingsPercent: 8, profitPercent: 5 },
    'Manufacturing': { savingsPercent: 15, profitPercent: 10 },
    'Supply Chain': { savingsPercent: 18, profitPercent: 12 },
    'Research & Development': { savingsPercent: 12, profitPercent: 8 }
  };
  return factors[department] || { savingsPercent: 12, profitPercent: 8 };
};