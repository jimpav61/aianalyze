interface StrategySectionProps {
  explanation: string;
  marketingStrategy: string;
}

export const StrategySection = ({ explanation, marketingStrategy }: StrategySectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h4 className="font-medium text-gray-700 mb-3">Implementation Strategy</h4>
      <p className="text-[#f65228] whitespace-pre-line">{explanation}</p>
      
      <h4 className="font-medium text-gray-700 mt-6 mb-3">Marketing Strategy</h4>
      <p className="text-[#f65228] whitespace-pre-line">{marketingStrategy}</p>
    </div>
  );
};