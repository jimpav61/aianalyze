import { ImplementationData } from "@/types/analysis";

interface ImplementationPlanProps {
  data: ImplementationData;
}

export const ImplementationPlan = ({ data }: ImplementationPlanProps) => {
  const implementationPhases = [
    {
      phase: "Phase 1: Planning and Setup (Weeks 1-2)",
      activities: [
        "Initial assessment and requirements gathering",
        "Define specific AI implementation goals and KPIs",
        "Identify key stakeholders and form implementation team",
        "Create detailed project timeline and resource allocation plan"
      ]
    },
    {
      phase: "Phase 2: Development and Integration (Weeks 3-6)",
      activities: [
        "Configure and customize AI solutions for specific use cases",
        "Integrate AI systems with existing infrastructure",
        "Develop and implement necessary APIs and connections",
        "Conduct initial testing and quality assurance"
      ]
    },
    {
      phase: "Phase 3: Testing and Training (Weeks 7-8)",
      activities: [
        "Comprehensive system testing and bug fixing",
        "Staff training and documentation development",
        "Pilot program implementation",
        "Gather and incorporate initial feedback"
      ]
    },
    {
      phase: "Phase 4: Launch and Optimization (Weeks 9-12)",
      activities: [
        "Full system deployment",
        "Monitor performance and gather metrics",
        "Continuous optimization and refinement",
        "Regular progress reviews and adjustments"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">Implementation Plan</h2>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-4">Timeline and Objectives</h3>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap break-words">{data.timeline || "Timeline to be determined based on specific requirements"}</p>
          
          <h3 className="font-medium text-lg mb-4">Budget Considerations</h3>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap break-words">{data.budget || "Budget to be determined based on implementation scope"}</p>
          
          {data.additionalInfo && (
            <>
              <h3 className="font-medium text-lg mb-4">Additional Information</h3>
              <p className="text-gray-600 mb-4 whitespace-pre-wrap break-words">{data.additionalInfo}</p>
            </>
          )}
        </div>

        <div className="space-y-6">
          <h3 className="font-medium text-lg mb-4">Implementation Phases</h3>
          {implementationPhases.map((phase, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-primary">{phase.phase}</h4>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                {phase.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="text-gray-600 ml-2 break-normal">{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mt-8">
          <h3 className="font-medium text-lg mb-4">Expected Outcomes</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li className="text-gray-600 ml-2 break-normal">
              Improved operational efficiency through automated workflows, reducing manual workload by up to 40% and enabling staff to focus on high-value tasks
            </li>
            <li className="text-gray-600 ml-2 break-normal">
              Enhanced customer satisfaction with 24/7 availability, instant response times, and personalized interactions leading to increased customer retention
            </li>
            <li className="text-gray-600 ml-2 break-normal">
              Substantial cost savings in customer service operations through reduced handling time and optimized resource allocation
            </li>
            <li className="text-gray-600 ml-2 break-normal">
              Future-proof scalable solution that adapts to growing business needs with built-in analytics and learning capabilities
            </li>
            <li className="text-gray-600 ml-2 break-normal">
              Quantifiable ROI through comprehensive analytics, including customer satisfaction scores, resolution rates, and operational cost reduction metrics
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};