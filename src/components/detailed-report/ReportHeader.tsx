import { Brain } from "lucide-react";

export const ReportHeader = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Brain className="w-10 h-10 text-chatsites" />
          <span className="text-2xl font-bold text-chatsites">ChatSites</span>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>Contact us:</p>
          <p>info@chatsites.ai</p>
          <p>+1 480 862 0288</p>
          <p>chatsites.ai</p>
        </div>
      </div>
    </>
  );
};