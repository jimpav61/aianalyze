import { Logo } from "./Logo";
import { HomeButton } from "./HomeButton";

interface HeaderProps {
  isMobile: boolean;
}

export const Header = ({ isMobile }: HeaderProps) => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        {!isMobile && <HomeButton />}
      </div>
    </header>
  );
};