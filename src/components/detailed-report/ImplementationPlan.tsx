import { Card } from "../ui/card";
import { DetailedFormData } from "@/types/analysis";

interface ImplementationPlanProps {
  data: DetailedFormData;
}

export const ImplementationPlan = ({ data }: ImplementationPlanProps) => {
  if (!data) {
    console.error("ImplementationPlan - Missing required data");
    return null;
  }

  const implementationPhases = [
    {
      phase: "Phase 1: Discovery & Planning",
      duration: "2-4 weeks",
      activities: [
        "Initial assessment and requirements gathering",
        "Technical architecture planning",
        "Resource allocation and team formation",
        "Stakeholder alignment and kickoff meetings"
      ]
    },
    {
      phase: "Phase 2: Development & Integration",
      duration: "6-8 weeks",
      activities: [
        "AI model customization and training",
        "System integration development",
        "User interface implementation",
        "Initial testing and quality assurance"
      ]
    },
    {
      phase: "Phase 3: Testing & Optimization",
      duration: "4-6 weeks",
      activities: [
        "User acceptance testing",
        "Performance optimization",
        "Security auditing",
        "System fine-tuning"
      ]
    },
    {
      phase: "Phase 4: Deployment & Training",
      duration: "2-4 weeks",
      activities: [
        "Production deployment",
        "Staff training and documentation",
        "Monitoring setup",
        "Go-live support"
      ]
    }
  ];

  return (
    <Card className="p-6 bg-white shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Implementation Plan</h3>
      
      <div className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-4">Project Parameters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Primary Objective:</p>
              <p className="text-gray-600">{data.objectives || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Timeline:</p>
              <p className="text-gray-600">{data.timeline || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Budget Allocation:</p>
              <p className="text-gray-600">{data.budget || "Not specified"}</p>
            </div>
            {data.additionalInfo && (
              <div>
                <p className="font-medium">Additional Considerations:</p>
                <p className="text-gray-600">{data.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {implementationPhases.map((phase, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#1A1F2C] mb-2">{phase.phase}</h4>
              <p className="text-sm text-gray-500 mb-3">Duration: {phase.duration}</p>
              <ul className="list-disc list-inside space-y-2">
                {phase.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="text-gray-600">{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};