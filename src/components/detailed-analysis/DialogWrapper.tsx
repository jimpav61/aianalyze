import { Dialog, DialogContent } from "../ui/dialog";
import { ReactNode } from "react";

interface DialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const DialogWrapper = ({ isOpen, onClose, children }: DialogWrapperProps) => {
  console.log("DialogWrapper - Render:", { isOpen });
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto pt-2 px-6 pb-4">
        {children}
      </DialogContent>
    </Dialog>
  );
};