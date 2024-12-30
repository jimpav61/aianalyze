export const getScalingFactor = (revenue: number): number => {
  if (revenue >= 10000000) return 0.85; // Very large enterprise
  if (revenue >= 5000000) return 0.9;  // Large enterprise
  if (revenue >= 1000000) return 0.95; // Medium-large business
  if (revenue >= 500000) return 1.0;   // Medium business
  if (revenue >= 100000) return 1.05;  // Small-medium business
  return 1.1; // Small business
};