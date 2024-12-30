import { DetailedFormData } from "@/types/analysis";
import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";

interface FinancialAnalysisGridProps {
  analysis: any;
  formData: DetailedFormData;
}

export const FinancialAnalysisGrid = ({ analysis, formData }: FinancialAnalysisGridProps) => {
  const revenue = calculateRevenue(formData.revenue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {analysis.allAnalyses.slice(1).map((dept: any, index: number) => {
        const deptFinancials = calculateFinancials(revenue, dept.department, analysis.industry);
        
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-700 mb-2">{dept.department}</h4>
            <p className="text-[#f65228] mb-4">{dept.function}</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Annual Savings</p>
                <p className="text-green-600 text-xl font-semibold flex items-center gap-1">
                  ${deptFinancials.savingsAmount.toLocaleString()}
                  <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </p>
                <p className="text-sm text-gray-500">
                  ({deptFinancials.savingsPercentage}% of revenue)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Profit Increase</p>
                <p className="text-green-600 text-xl font-semibold flex items-center gap-1">
                  ${deptFinancials.profitAmount.toLocaleString()}
                  <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </p>
                <p className="text-sm text-gray-500">
                  ({deptFinancials.profitPercentage}% increase)
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};