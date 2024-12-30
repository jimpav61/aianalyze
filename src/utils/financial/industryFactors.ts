export const getIndustryMultiplier = (industry: string): number => {
  const multipliers: { [key: string]: number } = {
    'Technology': 1.2,
    'Healthcare': 1.15,
    'Manufacturing': 1.15,
    'Retail': 1.0,
    'Financial Services': 1.25,
    'Education': 0.95,
    'Real Estate': 1.05,
    'Construction': 1.1,
    'Transportation': 1.1,
    'Energy': 1.2,
    'Agriculture': 0.95,
    'Hospitality': 1.0,
    'Professional Services': 1.15,
    'Media & Entertainment': 1.1,
    'Telecommunications': 1.15,
    'Architecture & Design': 1.1
  };
  return multipliers[industry] || 1.0;
};