import { Card } from "../ui/card";

interface ImplementationPlanProps {
  data: {
    objectives: string;
    timeline: string;
    budget: string;
    additionalInfo?: string;
  };
}

export const ImplementationPlan = ({ data }: ImplementationPlanProps) => {
  const formatText = (text: string) => {
    return text?.trim().replace(/\s+/g, ' ') || "";
  };

  const implementationPhases = [
    {
      phase: "Phase 1: Discovery & Planning",
      activities: [
        "Comprehensive requirements gathering and stakeholder interviews to ensure alignment with business objectives",
        "Detailed technical architecture planning including infrastructure assessment and capacity planning",
        "Thorough integration points identification and API compatibility analysis",
        "Strategic resource allocation planning and team structure definition"
      ]
    },
    {
      phase: "Phase 2: Development & Integration",
      activities: [
        "Custom AI model development and training with industry-specific data sets",
        "Secure API integrations setup with existing systems and third-party services",
        "Intuitive user interface development with focus on user experience",
        "Comprehensive testing and performance optimization for scalability"
      ]
    },
    {
      phase: "Phase 3: Testing & Training",
      activities: [
        "Rigorous system testing including load testing, security audits, and quality assurance",
        "In-depth staff training sessions covering all system features and best practices",
        "Detailed documentation creation including user guides and technical specifications",
        "Advanced performance optimization for maximum efficiency"
      ]
    },
    {
      phase: "Phase 4: Deployment & Support",
      activities: [
        "Carefully planned production deployment with minimal disruption",
        "24/7 monitoring and proactive maintenance to ensure optimal performance",
        "Continuous performance tracking and analytics for ROI measurement",
        "Ongoing system improvements based on user feedback and usage patterns"
      ]
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Implementation Plan</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Project Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Primary Objective:</p>
              <p className="text-gray-600">{formatText(data.objectives)}</p>
            </div>
            <div>
              <p className="font-medium">Timeline:</p>
              <p className="text-gray-600">{formatText(data.timeline)}</p>
            </div>
            <div>
              <p className="font-medium">Budget Allocation:</p>
              <p className="text-gray-600">{formatText(data.budget)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Implementation Phases</h3>
          {implementationPhases.map((phase, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-primary">{phase.phase}</h4>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {phase.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="text-gray-600">{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Expected Outcomes</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Improved operational efficiency through automated workflows, reducing manual workload by up to 40% and enabling staff to focus on high-value tasks</li>
            <li>Enhanced customer satisfaction with 24/7 availability, instant response times, and personalized interactions leading to increased customer retention</li>
            <li>Substantial cost savings in customer service operations through reduced handling time and optimized resource allocation</li>
            <li>Future-proof scalable solution that adapts to growing business needs with built-in analytics and learning capabilities</li>
            <li>Quantifiable ROI through comprehensive analytics, including customer satisfaction scores, resolution rates, and operational cost reduction metrics</li>
          </ul>
        </div>

        {data.additionalInfo && (
          <div>
            <h3 className="font-medium text-lg mb-2">Additional Considerations</h3>
            <p className="text-gray-600">{formatText(data.additionalInfo)}</p>
          </div>
        )}
      </div>
    </Card>
  );
};