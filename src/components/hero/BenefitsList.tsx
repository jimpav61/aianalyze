import { BenefitItem } from "./BenefitItem";

interface BenefitsListProps {
  position: "left" | "right";
}

export const BenefitsList = ({ position }: BenefitsListProps) => {
  const benefits = position === "left" 
    ? [
        "Get instant AI placement recommendations tailored to your industry",
        "Maximize efficiency with data-driven insights",
        "Identify high-impact opportunities for AI integration"
      ]
    : [
        "Receive customized implementation strategies",
        "Learn from industry-specific success metrics",
        "Get ROI projections based on real data"
      ];

  return (
    <div className="space-y-4 text-left">
      {benefits.map((benefit, index) => (
        <BenefitItem key={index} text={benefit} />
      ))}
    </div>
  );
};