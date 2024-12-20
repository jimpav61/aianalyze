import { DetailedFormData } from "@/types/analysis";

const generatePhaseSection = (title: string, items: string[]) => `
  <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <h4 style="margin: 0 0 12px 0; color: #f65228; font-weight: 500; line-height: 1.4;">${title}</h4>
    <ul style="margin: 0; padding-left: 20px; color: #4B5563; line-height: 1.6;">
      ${items.map((item, index) => `
        <li style="margin-bottom: ${index === items.length - 1 ? '0' : '8px'};">${item}</li>
      `).join('')}
    </ul>
  </div>
`;

export const generateImplementationSection = (doc: HTMLDivElement, formData: DetailedFormData) => {
  const implementationSection = document.createElement('div');
  implementationSection.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
      <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; line-height: 1.4;">Implementation Plan</h2>
      
      <div style="background: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; line-height: 1.4;">Project Overview</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="line-height: 1.6;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">Primary Objective:</p>
            <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.objectives}</p>
          </div>
          <div style="line-height: 1.6;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">Timeline:</p>
            <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.timeline}</p>
          </div>
          <div style="line-height: 1.6;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">Budget Allocation:</p>
            <p style="margin: 0; color: #4B5563;">${formData.budget}</p>
          </div>
        </div>
      </div>

      <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; line-height: 1.4;">Implementation Phases</h3>
      
      ${generatePhaseSection("Phase 1: Discovery & Planning", [
        "Comprehensive requirements gathering and stakeholder interviews to ensure alignment with business objectives",
        "Detailed technical architecture planning including infrastructure assessment and capacity planning",
        "Thorough integration points identification and API compatibility analysis",
        "Strategic resource allocation planning and team structure definition"
      ])}

      ${generatePhaseSection("Phase 2: Development & Integration", [
        "Custom AI model development and training with industry-specific data sets",
        "Secure API integrations setup with existing systems and third-party services",
        "Intuitive user interface development with focus on user experience",
        "Comprehensive testing and performance optimization for scalability"
      ])}

      ${generatePhaseSection("Phase 3: Testing & Training", [
        "Rigorous system testing including load testing, security audits, and quality assurance",
        "In-depth staff training sessions covering all system features and best practices",
        "Detailed documentation creation including user guides and technical specifications",
        "Advanced performance optimization for maximum efficiency"
      ])}

      ${generatePhaseSection("Phase 4: Deployment & Support", [
        "Carefully planned production deployment with minimal disruption",
        "24/7 monitoring and proactive maintenance to ensure optimal performance",
        "Continuous performance tracking and analytics for ROI measurement",
        "Ongoing system improvements based on user feedback and usage patterns"
      ])}

      <div style="background: #EFF6FF; border-radius: 8px; padding: 16px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; line-height: 1.4;">Expected Outcomes</h3>
        <ul style="margin: 0; padding-left: 20px; color: #4B5563; line-height: 1.6;">
          <li style="margin-bottom: 8px;">Improved operational efficiency through automated workflows, reducing manual workload by up to 40% and enabling staff to focus on high-value tasks</li>
          <li style="margin-bottom: 8px;">Enhanced customer satisfaction with 24/7 availability, instant response times, and personalized interactions leading to increased customer retention</li>
          <li style="margin-bottom: 8px;">Substantial cost savings in customer service operations through reduced handling time and optimized resource allocation</li>
          <li style="margin-bottom: 8px;">Future-proof scalable solution that adapts to growing business needs with built-in analytics and learning capabilities</li>
          <li style="margin-bottom: 0;">Quantifiable ROI through comprehensive analytics, including customer satisfaction scores, resolution rates, and operational cost reduction metrics</li>
        </ul>
      </div>
    </div>
  `;
  doc.appendChild(implementationSection);
};