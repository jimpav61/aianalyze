import { DetailedFormData } from "@/types/analysis";
import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";
import { TrendingUp } from "lucide-react";

interface AnalysisOverviewProps {
  analysis: any;
  formData: DetailedFormData;
}

export const AnalysisOverview = ({ analysis, formData }: AnalysisOverviewProps) => {
  // Use the same revenue calculation logic as other components
  const revenueAmount = calculateRevenue(formData.revenue);
  
  // Calculate financials using the same logic as other components
  const financials = calculateFinancials(revenueAmount, analysis.department, analysis.industry);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-medium text-gray-700 mb-2">{analysis.department}</h4>
        <p className="text-[#22A34A] mb-4">{analysis.bot_function}</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Annual Savings</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#22A34A]" />
              <p className="text-xl font-semibold text-[#22A34A]">
                ${financials.savingsAmount.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-[#22A34A]">
              ({financials.savingsPercentage}% of revenue)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Profit Increase</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#22A34A]" />
              <p className="text-xl font-semibold text-[#22A34A]">
                ${financials.profitAmount.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-[#22A34A]">
              ({financials.profitPercentage}% increase)
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700 mb-2">Implementation Strategy:</p>
            <p className="text-gray-600 text-sm">{analysis.explanation}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-2">Marketing Strategy:</p>
            <p className="text-gray-600 text-sm">{analysis.marketing_strategy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};