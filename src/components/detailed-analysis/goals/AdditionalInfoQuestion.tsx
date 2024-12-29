import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInfoQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const AdditionalInfoQuestion = ({
  value,
  onChange,
}: AdditionalInfoQuestionProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="additionalInfo" className="text-gray-700 text-base font-medium">
        Additional Information or Requirements
      </Label>
      <Textarea
        id="additionalInfo"
        name="additionalInfo"
        value={value}
        onChange={onChange}
        placeholder="Share any additional information or specific requirements for your AI implementation..."
        className="min-h-[100px] bg-white"
      />
    </div>
  );
};