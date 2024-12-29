import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ObjectivesQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

const objectiveOptions = [
  { value: "improve_efficiency", label: "Improve Operational Efficiency" },
  { value: "reduce_costs", label: "Reduce Operational Costs" },
  { value: "enhance_service", label: "Enhance Customer Service" },
  { value: "increase_revenue", label: "Increase Revenue" },
  { value: "automate_tasks", label: "Automate Repetitive Tasks" },
  { value: "scale_operations", label: "Scale Operations" },
];

export const ObjectivesQuestion = ({
  value,
  onChange,
  error,
}: ObjectivesQuestionProps) => {
  const selectedObjectives = value ? value.split(",") : [];

  const handleObjectiveChange = (objective: string, checked: boolean) => {
    let newObjectives = [...selectedObjectives];
    if (checked) {
      newObjectives.push(objective);
    } else {
      newObjectives = newObjectives.filter((obj) => obj !== objective);
    }
    
    const event = {
      target: {
        name: "objectives",
        value: newObjectives.join(","),
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(event);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="objectives" className="text-gray-700 text-base font-medium flex items-center">
        What are your primary objectives for implementing AI? <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {objectiveOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedObjectives.includes(option.label)}
              onCheckedChange={(checked) => handleObjectiveChange(option.label, checked as boolean)}
              className={`rounded-none bg-white ${error ? 'border-red-500' : ''}`}
            />
            <Label
              htmlFor={option.value}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};