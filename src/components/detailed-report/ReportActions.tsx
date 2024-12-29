import { Button } from "../ui/button";

interface ReportActionsProps {
  onBookDemo?: () => void;
}

export const ReportActions = ({ onBookDemo }: ReportActionsProps) => {
  return (
    <div className="flex justify-end">
      <Button
        onClick={onBookDemo}
        size="sm"
        className="bg-[#f65228] hover:bg-[#d43d16] text-white"
      >
        Book Demo
      </Button>
    </div>
  );
};