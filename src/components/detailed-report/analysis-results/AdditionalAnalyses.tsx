import { Card } from "@/components/ui/card";
import { calculateFinancials } from "@/utils/financialCalculations";

interface Analysis {
  department: string;
  function: string;
  savings: string;
  profit_increase: string;
  explanation: string;
  marketingStrategy: string;
}

interface AdditionalAnalysesProps {
  analyses: Analysis[];
  revenueAmount: number;
  formatCurrency: (value: string | number) => string;
  formatPercentage: (value: string | number) => string;
}

export const AdditionalAnalyses = ({ 
  analyses, 
  revenueAmount, 
  formatCurrency, 
  formatPercentage 
}: AdditionalAnalysesProps) => {
  if (analyses.length <= 1) return null;

  return (
    <div className="mt-8">
      <h4 className="font-medium text-gray-700 mb-4">Additional Department Analyses:</h4>
      <div className="space-y-4">
        {analyses.slice(1).map((analysis, index) => {
          const deptFinancials = calculateFinancials(revenueAmount, analysis.department);
          return (
            <Card key={index} className="p-6 bg-[#F8F9FC] border border-gray-100">
              <div className="mb-4">
                <p className="font-medium text-gray-700 mb-2">{analysis.department}</p>
                <p className="text-[#f65228] whitespace-pre-line leading-relaxed break-words">{analysis.function}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700">Savings: <span className="text-[#f65228] font-semibold">
                    {formatCurrency(deptFinancials.savingsAmount)}
                  </span></p>
                  <p className="text-sm text-gray-600">({formatPercentage(deptFinancials.savingsPercentage)} of revenue)</p>
                </div>
                <div>
                  <p className="text-gray-700">Additional Profit: <span className="text-[#f65228] font-semibold">
                    {formatCurrency(deptFinancials.profitAmount)}
                  </span></p>
                  <p className="text-sm text-gray-600">({formatPercentage(deptFinancials.profitPercentage)} increase)</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};