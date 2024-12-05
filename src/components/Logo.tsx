import { Brain } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Brain className="w-8 h-8 text-chatsites" />
      <span className="text-2xl font-bold text-chatsites">ChatSites</span>
    </div>
  );
};