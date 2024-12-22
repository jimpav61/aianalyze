import { FinancialAnalysisGrid } from "./FinancialAnalysisGrid";
import { DetailedFormData } from "@/types/analysis";

interface ImplementationRecommendationsProps {
  analysis: any;
  formData: DetailedFormData;
}

export const ImplementationRecommendations = ({ analysis, formData }: ImplementationRecommendationsProps) => {
  return (
    <div className="implementation-recommendations mt-8">
      <h3 className="text-xl font-semibold mb-4">AI Implementation Recommendations</h3>
      <FinancialAnalysisGrid analysis={analysis} formData={formData} />
    </div>
  );
};