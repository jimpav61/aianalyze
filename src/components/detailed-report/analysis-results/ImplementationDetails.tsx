interface ImplementationDetailsProps {
  explanation: string;
  marketingStrategy: string;
}

export const ImplementationDetails = ({ explanation, marketingStrategy }: ImplementationDetailsProps) => {
  return (
    <div className="p-6 mt-6 bg-[#F8F9FC] border border-gray-100 rounded-lg">
      <div className="space-y-6 print:space-y-8">
        <div className="mb-8 print:mb-8 print:break-inside-avoid">
          <p className="font-medium text-gray-700 mb-3">Implementation Strategy:</p>
          <p className="text-[#f65228] whitespace-pre-line leading-relaxed break-words max-w-full print:whitespace-normal print:break-words print:leading-relaxed">{explanation}</p>
        </div>
        <div className="print:break-inside-avoid">
          <p className="font-medium text-gray-700 mb-3">Marketing Strategy:</p>
          <p className="text-[#f65228] whitespace-pre-line leading-relaxed break-words max-w-full print:whitespace-normal print:break-words print:leading-relaxed print:mb-4">{marketingStrategy}</p>
        </div>
      </div>
    </div>
  );
};