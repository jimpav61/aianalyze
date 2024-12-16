import { Card } from "./ui/card";

export const SampleReport = () => {
  const sampleData = {
    companyName: "Sample Corp",
    industry: "Technology",
    department: "Customer Service",
    bot_function: "24/7 Customer Support Automation",
    savings: "150000",
    profit_increase: "25",
    explanation: "Implementation of AI chatbot system to handle customer inquiries",
    marketing_strategy: "Enhance customer experience with instant support"
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-white/50 backdrop-blur-sm shadow-lg">
      <div className="text-left">
        <h3 className="text-xl font-semibold mb-4">Sample AI Implementation Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-medium text-gray-700">Company:</p>
            <p className="text-gray-600 mb-2">{sampleData.companyName}</p>
            <p className="font-medium text-gray-700">Industry:</p>
            <p className="text-gray-600 mb-2">{sampleData.industry}</p>
            <p className="font-medium text-gray-700">Department:</p>
            <p className="text-gray-600">{sampleData.department}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Projected Annual Savings:</p>
            <p className="text-green-600 font-bold">${sampleData.savings}</p>
            <p className="font-medium text-gray-700">Profit Increase:</p>
            <p className="text-green-600 font-bold">{sampleData.profit_increase}%</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-medium text-gray-700">Implementation Strategy:</p>
          <p className="text-gray-600">{sampleData.explanation}</p>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          This is a sample report. Generate your own custom report by selecting your industry above.
        </div>
      </div>
    </Card>
  );
};