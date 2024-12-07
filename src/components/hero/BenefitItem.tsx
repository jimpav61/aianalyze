interface BenefitItemProps {
  text: string;
}

export const BenefitItem = ({ text }: BenefitItemProps) => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
};