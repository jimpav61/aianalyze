export const formatCurrency = (value: string | number) => {
  const num = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
  return !isNaN(num) ? `$${num.toLocaleString()}` : '$0';
};

export const formatPercentage = (value: string | number) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) ? `${num}%` : '0%';
};

export const formatText = (text: string | undefined) => {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
};