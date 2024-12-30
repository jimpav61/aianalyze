// Department-specific base factors
interface DepartmentFactors {
  savingsPercent: number;
  profitPercent: number;
}

export const getBaseFactors = (department: string): DepartmentFactors => {
  const factors: { [key: string]: DepartmentFactors } = {
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
    'Research & Development': { savingsPercent: 20, profitPercent: 15 }
  };
  return factors[department] || { savingsPercent: 20, profitPercent: 10 };
};