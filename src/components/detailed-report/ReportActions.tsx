import { Button } from "../ui/button";

interface ReportActionsProps {
  onBookDemo?: () => void;
  formData?: any;
  analysis?: any;
}

export const ReportActions = ({ onBookDemo }: ReportActionsProps) => {
  return (
    <div className="flex justify-end mt-8">
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