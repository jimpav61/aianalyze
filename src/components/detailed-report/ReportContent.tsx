import { DetailedFormData } from "@/types/analysis";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { CompanyInformation } from "./CompanyInformation";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";
import { AnalysisGrid } from "../AnalysisGrid";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis }: ReportContentProps) => {
  console.log("ReportContent - Analysis data:", analysis);
  
  const calculateFinancials = () => {
    const revenueStr = formData.revenue;
    let revenue: number;

    // Handle different revenue ranges
    if (revenueStr.includes('million')) {
      if (revenueStr.includes('1 million+')) {
        revenue = 1000000;
      } else {
        const match = revenueStr.match(/\$(\d+(?:\.\d+)?)/);
        revenue = match ? parseFloat(match[1]) * 1000000 : 0;
      }
    } else {
      // Extract both lower and upper bounds for ranges
      const matches = revenueStr.match(/\$(\d+(?:,\d{3})*)/g);
      if (matches && matches.length >= 1) {
        // For ranges like "$10,000 - $50,000", use average of bounds
        if (matches.length === 2) {
          const lowerBound = parseFloat(matches[0].replace(/[$,]/g, ''));
          const upperBound = parseFloat(matches[1].replace(/[$,]/g, ''));
          revenue = (lowerBound + upperBound) / 2; // Use average for more realistic estimates
        } else {
          revenue = parseFloat(matches[0].replace(/[$,]/g, ''));
        }
      } else {
        revenue = 0;
      }
    }

    console.log("Calculated revenue base:", revenue);

    if (revenue === 0) {
      return {
        savings: { amount: 0, percentage: 0 },
        profit: { amount: 0, percentage: 0 }
      };
    }

    // Department-specific calculation factors adjusted by revenue scale
    const getScaledFactors = (baseFactors: { savingsPercent: number, profitPercent: number }) => {
      // Scale factors based on revenue size
      let scale = 1;
      if (revenue < 50000) {
        scale = 1.2; // Higher percentage impact for smaller businesses
      } else if (revenue > 1000000) {
        scale = 0.8; // Lower percentage but higher absolute numbers for larger businesses
      }
      
      return {
        savingsPercent: baseFactors.savingsPercent * scale,
        profitPercent: baseFactors.profitPercent * scale
      };
    };

    const departmentFactors: Record<string, { savingsPercent: number, profitPercent: number }> = {
      'Customer Service': {
        savingsPercent: 25, // Base: 25% potential savings in customer service costs
        profitPercent: 8    // Base: 8% profit increase through better customer retention
      },
      'Marketing': {
        savingsPercent: 15, // Base: 15% savings in marketing spend
        profitPercent: 12   // Base: 12% profit increase through better targeting
      },
      'Sales': {
        savingsPercent: 20, // Base: 20% savings in sales operations
        profitPercent: 15   // Base: 15% profit increase through better conversion
      }
    };

    // Get and scale department-specific factors
    const baseFactors = departmentFactors[analysis.department] || {
      savingsPercent: 10,
      profitPercent: 5
    };
    
    const scaledFactors = getScaledFactors(baseFactors);

    // Calculate department-specific savings with scaled factors
    const savingsAmount = Math.round(revenue * (scaledFactors.savingsPercent / 100));
    const savingsPercentage = parseFloat(scaledFactors.savingsPercent.toFixed(1));
    
    // Calculate department-specific profit increase with scaled factors
    const profitPercentage = parseFloat(scaledFactors.profitPercent.toFixed(1));
    const profitAmount = Math.round(revenue * (profitPercentage / 100));
    
    console.log("Financial calculations:", {
      revenue,
      savingsAmount,
      savingsPercentage,
      profitAmount,
      profitPercentage,
      department: analysis.department,
      scaledFactors
    });

    return {
      savings: {
        amount: savingsAmount,
        percentage: savingsPercentage
      },
      profit: {
        amount: profitAmount,
        percentage: profitPercentage
      }
    };
  };

  const financials = calculateFinancials();

  const analysesForGrid = analysis.allAnalyses?.map((item: any) => {
    // Calculate department-specific financials for each analysis using the same scaling logic
    const getScaledFactors = (baseFactors: { savingsPercent: number, profitPercent: number }) => {
      const revenueNum = parseFloat(formData.revenue.replace(/[^0-9.]/g, '')) || 0;
      let scale = 1;
      if (revenueNum < 50000) {
        scale = 1.2;
      } else if (revenueNum > 1000000) {
        scale = 0.8;
      }
      return {
        savingsPercent: baseFactors.savingsPercent * scale,
        profitPercent: baseFactors.profitPercent * scale
      };
    };

    const departmentFactors: Record<string, { savingsPercent: number, profitPercent: number }> = {
      'Customer Service': {
        savingsPercent: 25,
        profitPercent: 8
      },
      'Marketing': {
        savingsPercent: 15,
        profitPercent: 12
      },
      'Sales': {
        savingsPercent: 20,
        profitPercent: 15
      }
    };

    const baseFactors = departmentFactors[item.department] || {
      savingsPercent: 10,
      profitPercent: 5
    };

    const scaledFactors = getScaledFactors(baseFactors);
    const revenueNum = parseFloat(formData.revenue.replace(/[^0-9.]/g, '')) || 0;
    const savingsAmount = Math.round(revenueNum * (scaledFactors.savingsPercent / 100));
    const profitAmount = Math.round(revenueNum * (scaledFactors.profitPercent / 100));

    return {
      ...item,
      savings: savingsAmount.toString(),
      profit_increase: scaledFactors.profitPercent.toFixed(1),
      explanation: item.explanation,
      marketingStrategy: item.marketingStrategy,
      actualProfitIncrease: profitAmount.toString(),
      savingsPercentage: scaledFactors.savingsPercent.toFixed(1)
    };
  }) || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: financials.savings.amount.toString(),
    profit_increase: financials.profit.percentage.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy,
    actualProfitIncrease: financials.profit.amount.toString(),
    savingsPercentage: financials.savings.percentage.toString()
  }];

  console.log("ReportContent - Analyses for grid:", analysesForGrid);

  return (
    <div id="detailed-report" className="space-y-6 bg-white p-4 sm:p-8 rounded-lg max-w-full overflow-x-hidden">
      <ReportHeader />
      <div className="company-info whitespace-pre-line">
        <CompanyInformation data={formData} industry={analysis?.industry} />
      </div>
      <div className="current-operations whitespace-pre-line">
        <CurrentOperations data={formData} />
      </div>
      <div className="analysis-results whitespace-pre-line">
        <AnalysisResults 
          analyses={analysesForGrid} 
          revenue={formData.revenue}
        />
      </div>
      <div className="implementation-recommendations mt-8">
        <h3 className="text-xl font-semibold mb-4">AI Implementation Recommendations</h3>
        <div className="overflow-x-auto">
          <AnalysisGrid analyses={analysesForGrid} />
        </div>
      </div>
      <div className="implementation-plan whitespace-pre-line">
        <ImplementationPlan data={{
          objectives: formData.objectives,
          timeline: formData.timeline,
          budget: formData.budget,
          additionalInfo: formData.additionalInfo
        }} />
      </div>
      <ReportFooter />
    </div>
  );
};