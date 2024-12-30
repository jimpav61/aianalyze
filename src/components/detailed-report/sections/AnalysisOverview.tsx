import { DetailedFormData } from "@/types/analysis";
import { calculateFinancials } from "@/utils/financialCalculations";

interface AnalysisOverviewProps {
  analysis: any;
  formData: DetailedFormData;
}

export const AnalysisOverview = ({ analysis, formData }: AnalysisOverviewProps) => {
  // Convert revenue string to number before calculation
  const revenueAmount = parseInt(formData.revenue?.replace(/[^0-9]/g, '') || '0');
  const revenue = calculateFinancials(revenueAmount, analysis.department, analysis.industry);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-medium text-gray-700 mb-2">Primary Department</h4>
        <p className="text-[#f65228]">{analysis.department}</p>
        <h4 className="font-medium text-gray-700 mt-4 mb-2">Primary Function</h4>
        <p className="text-[#f65228]">{analysis.bot_function}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-medium text-gray-700 mb-2">Financial Impact</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Annual Savings</p>
            <p className="text-2xl font-semibold text-[#f65228]">
              ${revenue.savingsAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              ({revenue.savingsPercentage}% of revenue)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Profit Increase</p>
            <p className="text-2xl font-semibold text-[#f65228]">
              ${revenue.profitAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              ({revenue.profitPercentage}% increase)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};