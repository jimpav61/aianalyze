export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

export const formatText = (text: string): string => {
  return text.replace(/\n/g, ' ').replace(/\r/g, ' ');
};