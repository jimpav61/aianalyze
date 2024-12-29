import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface BudgetQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

const budgetOptions = [
  { value: "under_5k", label: "Under $5,000" },
  { value: "5k_15k", label: "$5,000 - $15,000" },
  { value: "15k_30k", label: "$15,000 - $30,000" },
  { value: "30k_50k", label: "$30,000 - $50,000" },
  { value: "50k_plus", label: "$50,000+" },
];

export const BudgetQuestion = ({
  value,
  onChange,
  error,
}: BudgetQuestionProps) => {
  const selectedBudgets = value ? value.split(",") : [];

  const handleBudgetChange = (budget: string, checked: boolean) => {
    let newBudgets = [...selectedBudgets];
    if (checked) {
      newBudgets.push(budget);
    } else {
      newBudgets = newBudgets.filter((b) => b !== budget);
    }
    
    const event = {
      target: {
        name: "budget",
        value: newBudgets.join(","),
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(event);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="budget" className="text-gray-700 text-base font-medium flex items-center">
        What is your budget range for this implementation? <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {budgetOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedBudgets.includes(option.label)}
              onCheckedChange={(checked) => handleBudgetChange(option.label, checked as boolean)}
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