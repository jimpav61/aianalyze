import { AlertDialogDescription } from "../../ui/alert-dialog";
import { DownloadButton } from "./DownloadButton";
import { DetailedFormData } from "@/types/analysis";

interface DialogDescriptionProps {
  formData?: DetailedFormData;
  analysis?: any;
}

export const DialogDescription = ({ formData, analysis }: DialogDescriptionProps) => {
  return (
    <AlertDialogDescription className="space-y-4">
      <p className="text-gray-600">Don't worry, you can still access and download your analysis report after closing this window.</p>
      <DownloadButton formData={formData} analysis={analysis} />
    </AlertDialogDescription>
  );
};