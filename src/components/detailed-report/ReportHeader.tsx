import { Brain } from "lucide-react";

export const ReportHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Brain className="w-10 h-10 text-[#f65228]" />
        <span className="text-2xl font-bold text-[#f65228]">ChatSites</span>
      </div>
      <div className="text-right text-sm text-gray-600 space-y-1">
        <p className="font-semibold">Contact us:</p>
        <p>info@chatsites.ai</p>
        <p>+1 480 862 0288</p>
        <p>chatsites.ai</p>
      </div>
    </div>
  );
};