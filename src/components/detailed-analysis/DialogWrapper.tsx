import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const DialogWrapper = ({ isOpen, onClose, children }: DialogWrapperProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        {children}
      </DialogContent>
    </Dialog>
  );
};