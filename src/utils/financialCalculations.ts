import { calculateRevenue } from './financial/revenueParser';
import { getIndustryMultiplier } from './financial/industryFactors';
import { getBaseFactors } from './financial/departmentFactors';
import { getScalingFactor } from './financial/scalingFactors';
import type { FinancialResult } from './financial/types';

export { calculateRevenue };

export const calculateFinancials = (revenue: number, department: string, industry?: string): FinancialResult => {
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