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
  const implementationPhases = [
    {
      phase: "Phase 1: Discovery & Planning",
      duration: "2-3 weeks",
      activities: [
        "Detailed requirements gathering",
        "Technical architecture planning",
        "Integration points identification",
        "Resource allocation planning"
      ]
    },
    {
      phase: "Phase 2: Development & Integration",
      duration: "4-6 weeks",
      activities: [
        "AI model customization",
        "API integrations setup",
        "User interface development",
        "Initial testing and optimization"
      ]
    },
    {
      phase: "Phase 3: Testing & Training",
      duration: "2-3 weeks",
      activities: [
        "System testing and QA",
        "Staff training sessions",
        "Documentation completion",
        "Performance optimization"
      ]
    },
    {
      phase: "Phase 4: Deployment & Support",
      duration: "Ongoing",
      activities: [
        "Production deployment",
        "Monitoring and maintenance",
        "Performance tracking",
        "Continuous improvement"
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
              <p className="text-gray-600">{data.objectives}</p>
            </div>
            <div>
              <p className="font-medium">Timeline:</p>
              <p className="text-gray-600">{data.timeline}</p>
            </div>
            <div>
              <p className="font-medium">Budget Allocation:</p>
              <p className="text-gray-600">${Number(data.budget).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Implementation Phases</h3>
          {implementationPhases.map((phase, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-primary">{phase.phase}</h4>
                <span className="text-sm text-gray-500">{phase.duration}</span>
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
            <li>Improved operational efficiency and reduced manual workload</li>
            <li>Enhanced customer satisfaction through faster response times</li>
            <li>Significant cost savings in customer service operations</li>
            <li>Scalable solution that grows with your business needs</li>
            <li>Measurable ROI through detailed analytics and reporting</li>
          </ul>
        </div>

        {data.additionalInfo && (
          <div>
            <h3 className="font-medium text-lg mb-2">Additional Considerations</h3>
            <p className="text-gray-600">{data.additionalInfo}</p>
          </div>
        )}
      </div>
    </Card>
  );
};