import { HomeButton } from "./HomeButton";

interface BottomSectionProps {
  hasSubmitted: boolean;
  analysesLength: number;
}

export const BottomSection = ({ hasSubmitted, analysesLength }: BottomSectionProps) => {
  if (!hasSubmitted && analysesLength === 0) {
    return (
      <div className="mt-16 flex justify-center">
        <HomeButton />
      </div>
    );
  }

  if (hasSubmitted) {
    return (
      <div className="mt-8 flex justify-center">
        <HomeButton />
      </div>
    );
  }

  return null;
};