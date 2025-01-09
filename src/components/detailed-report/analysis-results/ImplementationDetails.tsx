interface ImplementationDetailsProps {
  explanation: string;
  marketingStrategy: string;
}

export const ImplementationDetails = ({ explanation, marketingStrategy }: ImplementationDetailsProps) => {
  return (
    <div className="p-6 mt-6 bg-[#F8F9FC] border border-gray-100 rounded-lg">
      <div className="space-y-6 print:space-y-4">
        <div className="mb-8 print:mb-6 print:break-inside-avoid">
          <p className="font-medium text-gray-700 mb-3">Implementation Strategy:</p>
          <p className="text-[#f65228] whitespace-pre-line leading-relaxed break-words max-w-full print:whitespace-pre-wrap print:break-words print:leading-[1.8] print:text-[14px]">{explanation}</p>
        </div>
        <div className="print:break-inside-avoid">
          <p className="font-medium text-gray-700 mb-3">Marketing Strategy:</p>
          <p className="text-[#f65228] whitespace-pre-line leading-relaxed break-words max-w-full print:whitespace-pre-wrap print:break-words print:leading-[1.8] print:text-[14px] print:mb-6 print:!block print:!visible">{marketingStrategy}</p>
        </div>
      </div>
    </div>
  );
};