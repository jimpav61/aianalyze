// Revenue-based scaling factors
export const getScalingFactor = (revenue: number): number => {
  if (revenue >= 100000000) return 0.6; // Very large enterprise
  if (revenue >= 50000000) return 0.7; // Large enterprise
  if (revenue >= 10000000) return 0.8; // Medium-large business
  if (revenue >= 5000000) return 0.9; // Medium business
  if (revenue >= 1000000) return 1.0; // Small-medium business
  if (revenue >= 500000) return 1.1; // Small business
  return 1.2; // Very small business (higher relative impact)
};