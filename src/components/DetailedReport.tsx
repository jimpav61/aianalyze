import { Brain } from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface DetailedReportProps {
  data: {
    companyName: string;
    phoneNumber: string;
    email: string;
    employees: string;
    revenue: string;
    serviceChannels: string;
    monthlyInteractions: string;
    currentTools: string;
    painPoints: string;
    objectives: string;
    timeline: string;
    budget: string;
    additionalInfo: string;
  };
  analysis?: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  };
}

export const DetailedReport = ({ data, analysis }: DetailedReportProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Header with Logo */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Brain className="w-10 h-10 text-chatsites" />
          <span className="text-2xl font-bold text-chatsites">ChatSites</span>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>Contact us:</p>
          <p>support@chatsites.ai</p>
          <p>1-800-CHAT-BOT</p>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Report Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        AI Implementation Analysis Report
      </h1>

      {/* Company Information */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Company Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Company Name:</p>
            <p className="text-gray-600">{data.companyName}</p>
          </div>
          <div>
            <p className="font-medium">Industry:</p>
            <p className="text-gray-600">{analysis?.industry}</p>
          </div>
          <div>
            <p className="font-medium">Contact Email:</p>
            <p className="text-gray-600">{data.email}</p>
          </div>
          <div>
            <p className="font-medium">Contact Phone:</p>
            <p className="text-gray-600">{data.phoneNumber}</p>
          </div>
          <div>
            <p className="font-medium">Number of Employees:</p>
            <p className="text-gray-600">{data.employees}</p>
          </div>
          <div>
            <p className="font-medium">Annual Revenue:</p>
            <p className="text-gray-600">{data.revenue}</p>
          </div>
        </div>
      </Card>

      {/* Analysis Results */}
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

      {/* Current Operations */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Operations</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Service Channels:</p>
            <p className="text-gray-600">{data.serviceChannels}</p>
          </div>
          <div>
            <p className="font-medium">Monthly Interactions:</p>
            <p className="text-gray-600">{data.monthlyInteractions}</p>
          </div>
          <div>
            <p className="font-medium">Current Tools:</p>
            <p className="text-gray-600">{data.currentTools}</p>
          </div>
          <div>
            <p className="font-medium">Pain Points:</p>
            <p className="text-gray-600">{data.painPoints}</p>
          </div>
        </div>
      </Card>

      {/* Implementation Plan */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Implementation Plan</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Objectives:</p>
            <p className="text-gray-600">{data.objectives}</p>
          </div>
          <div>
            <p className="font-medium">Timeline:</p>
            <p className="text-gray-600">{data.timeline}</p>
          </div>
          <div>
            <p className="font-medium">Budget:</p>
            <p className="text-gray-600">{data.budget}</p>
          </div>
          {data.additionalInfo && (
            <div>
              <p className="font-medium">Additional Information:</p>
              <p className="text-gray-600">{data.additionalInfo}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Generated by ChatSites AI Analysis Tool</p>
        <p>www.chatsites.ai</p>
      </div>
    </div>
  );
};