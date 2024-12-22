export const getBaseFactors = (department: string) => {
  // Different departments have different potential for savings and profit increases
  const factors = {
    'Customer Service': { 
      savingsPercent: 15, // Automation can significantly reduce support costs
      profitPercent: 8    // Better customer satisfaction leads to moderate profit increase
    },
    'Marketing': { 
      savingsPercent: 12, // AI can optimize ad spend and campaign costs
      profitPercent: 18   // Better targeting leads to higher conversion rates
    },
    'Sales': { 
      savingsPercent: 10, // Some processes can be automated
      profitPercent: 25   // AI can significantly increase conversion rates
    },
    'Operations': { 
      savingsPercent: 22, // High potential for process automation
      profitPercent: 12   // Efficiency gains lead to moderate profit increase
    },
    'Human Resources': { 
      savingsPercent: 18, // Automation of recruitment and admin tasks
      profitPercent: 6    // Indirect impact on profit through better hiring
    },
    'Finance': { 
      savingsPercent: 20, // Automation of accounting and reporting
      profitPercent: 10   // Better financial planning leads to profit optimization
    },
    'IT': { 
      savingsPercent: 25, // High automation potential
      profitPercent: 15   // Technical efficiency leads to significant gains
    },
    'Legal': { 
      savingsPercent: 12, // Limited automation potential
      profitPercent: 5    // Mostly risk mitigation benefits
    },
    'Supply Chain': {
      savingsPercent: 20, // Inventory and logistics optimization
      profitPercent: 15   // Better supply chain management increases margins
    },
    'Research & Development': {
      savingsPercent: 15, // Process automation benefits
      profitPercent: 20   // AI-driven innovation leads to new revenue streams
    }
  };
  
  // Default to Customer Service if department not found
  return factors[department as keyof typeof factors] || factors['Customer Service'];
};

const getScalingFactor = (revenue: number) => {
  // Larger companies have diminishing returns due to complexity
  if (revenue >= 50000000) return 0.6;  // Very large companies
  if (revenue >= 10000000) return 0.7;  // Large companies
  if (revenue >= 5000000) return 0.8;   // Medium-large companies
  if (revenue >= 1000000) return 0.9;   // Medium companies
  if (revenue >= 500000) return 0.95;   // Small-medium companies
  return 1;                             // Small companies get full benefit
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
  
  // Apply scaling factor but add some variance (±10%) to make numbers more realistic
  const variance = 0.9 + (Math.random() * 0.2); // Random number between 0.9 and 1.1
  
  const scaledFactors = {
    savingsPercent: baseFactors.savingsPercent * scalingFactor * variance,
    profitPercent: baseFactors.profitPercent * scalingFactor * variance
  };

  // Calculate actual amounts based on revenue
  const savingsAmount = Math.round(revenue * (scaledFactors.savingsPercent / 100));
  const savingsPercentage = parseFloat(scaledFactors.savingsPercent.toFixed(1));
  const profitPercentage = parseFloat(scaledFactors.profitPercent.toFixed(1));
  const profitAmount = Math.round(revenue * (profitPercentage / 100));

  console.log('Financial calculations for', department, {
    revenue,
    scalingFactor,
    variance,
    savingsAmount,
    savingsPercentage,
    profitPercentage,
    profitAmount
  });

  return {
    savingsAmount,
    savingsPercentage,
    profitPercentage,
    profitAmount
  };
};