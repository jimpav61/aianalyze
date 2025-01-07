// Revenue-based scaling factors
export const getScalingFactor = (revenue: number): number => {
  if (revenue >= 100000000) return 0.4; // Very large enterprise
  if (revenue >= 50000000) return 0.5; // Large enterprise
  if (revenue >= 10000000) return 0.6; // Medium-large business
  if (revenue >= 5000000) return 0.7; // Medium business
  if (revenue >= 1000000) return 0.8; // Small-medium business
  if (revenue >= 500000) return 0.9; // Small business
  return 1.0; // Very small business (higher relative impact)
};