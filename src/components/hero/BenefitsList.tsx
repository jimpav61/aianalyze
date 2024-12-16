import { BenefitItem } from "./BenefitItem";

interface BenefitsListProps {
  position: "left" | "right";
}

export const BenefitsList = ({ position }: BenefitsListProps) => {
  const benefits = [
    "Instant AI Roadmap with 99.99% Reliability: Deliver personalized insights into how and where AI bots can transform your business, backed by cutting-edge technology for seamless, always-on performance.",
    "24/7 Customer Engagement That Converts: Showcase products, schedule appointments, and interact with precision-driven AI to qualify leads and boost conversions—all while maintaining flexibility with human handoffs for peace of mind.",
    "Tailored AI Solutions for Any Business Size or Niche: Whether you're a solopreneur, small business, or enterprise, our platform adapts to your needs, using industry-leading LLMs like OpenAI, Claude, Grok, and Gemini 2 to provide unmatched scalability and innovation."
  ];

  return (
    <div className="space-y-6 text-left">
      {benefits.map((benefit, index) => (
        <BenefitItem key={index} text={benefit} />
      ))}
    </div>
  );
};