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
          <p>support@chatsites.ai</p>
          <p>1-800-CHAT-BOT</p>
        </div>
      </div>
    </>
  );
};