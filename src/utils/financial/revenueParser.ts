// Handles parsing and standardizing revenue input
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