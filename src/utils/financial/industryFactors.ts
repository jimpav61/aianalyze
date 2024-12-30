// Industry-specific multipliers
export const getIndustryMultiplier = (industry: string): number => {
  const multipliers: { [key: string]: number } = {
    'Technology': 1.4,
    'Healthcare': 1.2,
    'Manufacturing': 1.3,
    'Retail': 0.9,
    'Financial Services': 1.35,
    'Education': 0.8,
    'Real Estate': 0.95,
    'Construction': 1.1,
    'Transportation': 1.15,
    'Energy': 1.4,
    'Agriculture': 0.85,
    'Hospitality': 0.9,
    'Professional Services': 1.25,
    'Media & Entertainment': 1.2,
    'Telecommunications': 1.3
  };
  return multipliers[industry] || 1.0;
};