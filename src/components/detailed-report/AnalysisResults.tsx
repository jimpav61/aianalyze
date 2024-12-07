import { Card } from "../ui/card";

interface AnalysisResultsProps {
  analysis?: {
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  };
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="p-6 mb-8 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white rounded-lg border">
          <p className="text-sm text-gray-600">Projected Annual Savings</p>
          <p className="text-2xl font-bold text-success">
            {analysis && formatCurrency(analysis.savings)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg border">
          <p className="text-sm text-gray-600">Projected Profit Increase</p>
          <p className="text-2xl font-bold text-primary">
            {analysis && formatCurrency(analysis.profit_increase)}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Recommended Implementation:</h3>
          <p className="text-gray-600">{analysis?.explanation}</p>
        </div>
        <div>
          <h3 className="font-medium">Marketing Strategy:</h3>
          <p className="text-gray-600">{analysis?.marketing_strategy}</p>
        </div>
      </div>
    </Card>
  );
};