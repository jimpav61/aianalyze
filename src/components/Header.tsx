import { Logo } from "./Logo";

interface HeaderProps {
  isMobile?: boolean;
}

export const Header = ({ isMobile }: HeaderProps) => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
      </div>
    </header>
  );
};