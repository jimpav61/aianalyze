import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export const HomeButton = () => {
  return (
    <Button
      onClick={() => window.location.href = 'https://chatsites.ai'}
      className="bg-[#f65228] hover:bg-[#f65228]/90 text-white"
    >
      <Home className="mr-2 h-4 w-4" />
      Home
    </Button>
  );
};