import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const HomeButton = () => {
  return (
    <Button
      onClick={() => window.location.href = 'https://chatsites.ai'}
      className="bg-[#f65228] hover:bg-[#f65228]/90 text-white"
    >
      <ExternalLink className="mr-2 h-4 w-4" />
      Take me to website
    </Button>
  );
};