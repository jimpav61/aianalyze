import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

interface AdditionalInfoQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const AdditionalInfoQuestion = ({ value, onChange }: AdditionalInfoQuestionProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="additionalInfo" className="text-base font-medium">
        Question 4: Any additional information you'd like to share? (Optional)
      </Label>
      <Textarea
        id="additionalInfo"
        name="additionalInfo"
        value={value}
        onChange={onChange}
        placeholder="Share any other relevant details..."
        className="min-h-[100px]"
      />
    </div>
  );
};