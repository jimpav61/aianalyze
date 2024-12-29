import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface TimelineQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

const timelineOptions = [
  { value: "immediate", label: "Immediate (1-3 months)" },
  { value: "short_term", label: "Short-term (3-6 months)" },
  { value: "medium_term", label: "Medium-term (6-12 months)" },
  { value: "long_term", label: "Long-term (12+ months)" },
];

export const TimelineQuestion = ({
  value,
  onChange,
  error,
}: TimelineQuestionProps) => {
  const selectedTimelines = value ? value.split(",") : [];

  const handleTimelineChange = (timeline: string, checked: boolean) => {
    let newTimelines = [...selectedTimelines];
    if (checked) {
      newTimelines.push(timeline);
    } else {
      newTimelines = newTimelines.filter((time) => time !== timeline);
    }
    
    const event = {
      target: {
        name: "timeline",
        value: newTimelines.join(","),
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(event);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="timeline" className="text-gray-700 text-base font-medium flex items-center">
        What is your expected implementation timeline? <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {timelineOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedTimelines.includes(option.label)}
              onCheckedChange={(checked) => handleTimelineChange(option.label, checked as boolean)}
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