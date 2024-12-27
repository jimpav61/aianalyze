import { Card } from "./ui/card";
import { AnalysisGrid } from "./AnalysisGrid";
import { Info } from "lucide-react";

export const SampleReport = () => {
  const sampleData = {
    companyName: "Sample Corp",
    industry: "Technology",
    department: "Customer Service",
    bot_function: "24/7 Customer Support Automation",
    savings: "45000",
    profit_increase: "15",
    explanation: "Implementation of AI chatbot system to handle customer inquiries",
    marketing_strategy: "Enhance customer experience with instant support"
  };

  const sampleAnalyses = [
    {
      id: "sample-1",
      department: "Customer Service",
      function: "24/7 Customer Support Automation",
      savings: "45000",
      profit_increase: "15",
      explanation: "Implementation of AI chatbot system to handle customer inquiries and support tickets automatically, reducing response time and staff workload.",
      marketingStrategy: "Enhance customer experience with instant support availability and consistent service quality."
    },
    {
      id: "sample-2",
      department: "Sales",
      function: "Lead Qualification & Scoring",
      savings: "35000",
      profit_increase: "12",
      explanation: "AI-powered lead scoring system to automatically qualify and prioritize sales leads, improving conversion rates and sales efficiency.",
      marketingStrategy: "Accelerate sales cycle and improve prospect engagement through intelligent lead nurturing."
    },
    {
      id: "sample-3",
      department: "Marketing",
      function: "Content Personalization",
      savings: "25000",
      profit_increase: "10",
      explanation: "AI-driven content personalization engine to deliver targeted marketing messages and recommendations to different customer segments.",
      marketingStrategy: "Increase engagement and conversion rates through personalized customer experiences."
    }
  ];

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-white/50 backdrop-blur-sm shadow-lg animate-[fadeIn_0.5s_ease-out]">
      <div className="text-left">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-[#f65228]" />
          <h3 className="text-xl font-semibold">Sample AI Implementation Report</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50/50 rounded-lg mb-6">
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-700">Company:</p>
              <p className="text-gray-600">{sampleData.companyName}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Industry:</p>
              <p className="text-gray-600">{sampleData.industry}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Department:</p>
              <p className="text-gray-600">{sampleData.department}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-700">Projected Annual Savings:</p>
              <p className="text-green-600 font-bold text-lg">${sampleData.savings}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Profit Increase:</p>
              <p className="text-orange-600 font-bold text-lg">{sampleData.profit_increase}%</p>
            </div>
          </div>
        </div>

        <div className="mb-8 p-4 bg-gray-50/50 rounded-lg">
          <p className="font-medium text-gray-700">Implementation Strategy:</p>
          <p className="text-gray-600 leading-relaxed mt-2">{sampleData.explanation}</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Info className="h-5 w-5 text-[#f65228]" />
            Recommended AI Implementation Options
          </h4>
          <AnalysisGrid analyses={sampleAnalyses} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 bg-blue-50/50 p-4 rounded-lg">
          This is a sample report. Generate your own custom report by selecting your industry above.
        </div>
      </div>
    </Card>
  );
};