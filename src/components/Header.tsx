import { Logo } from "./Logo";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  isMobile: boolean;
}

export const Header = ({ isMobile }: HeaderProps) => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <Button
          onClick={() => window.location.href = 'https://chatsites.ai'}
          className="bg-[#f65228] hover:bg-[#f65228]/90 text-white"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Back to Website
        </Button>
      </div>
    </header>
  );
};