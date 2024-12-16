import { BenefitItem } from "./BenefitItem";

interface BenefitsListProps {
  position: "left" | "right";
}

export const BenefitsList = ({ position }: BenefitsListProps) => {
  const benefits = [
    "Instant AI Roadmap: Get actionable insights with 99.99% reliable performance.",
    "24/7 Engagement That Converts: Qualify leads, boost sales, and seamlessly hand off to humans.",
    "Tailored Solutions for Every Business: Scalable AI powered by OpenAI, Claude, Grok, and Gemini 2."
  ];

  return (
    <div className="space-y-6 text-left">
      {benefits.map((benefit, index) => (
        <BenefitItem key={index} text={benefit} />
      ))}
    </div>
  );
};