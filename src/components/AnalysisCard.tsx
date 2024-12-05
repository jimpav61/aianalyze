import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, TrendingUp, DollarSign } from "lucide-react";

interface AnalysisCardProps {
  department: string;
  function: string;
  savings: string;
  profit: string;
}

export const AnalysisCard = ({ department, function: botFunction, savings, profit }: AnalysisCardProps) => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{department}</CardTitle>
        <Bot className="w-6 h-6 text-chatsites" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Badge variant="secondary" className="mb-2">Function</Badge>
            <p className="text-sm text-gray-600">{botFunction}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Savings: {savings}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Profit: {profit}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};