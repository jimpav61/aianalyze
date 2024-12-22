import { DetailedFormData } from "@/types/analysis";

export const generateImplementationSection = (doc: HTMLDivElement, formData: DetailedFormData) => {
  const implementationSection = document.createElement('div');
  implementationSection.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Implementation Plan</h2>
      
      <div style="background: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Project Overview</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <p style="font-weight: 500; margin-bottom: 4px;">Primary Objective:</p>
            <p style="color: #4B5563;">${formData.objectives}</p>
          </div>
          <div>
            <p style="font-weight: 500; margin-bottom: 4px;">Timeline:</p>
            <p style="color: #4B5563;">${formData.timeline}</p>
          </div>
          <div>
            <p style="font-weight: 500; margin-bottom: 4px;">Budget Allocation:</p>
            <p style="color: #4B5563;">${formData.budget}</p>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Implementation Phases</h3>
        
        <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h4 style="color: #f65228; font-weight: 500; margin-bottom: 12px;">Phase 1: Discovery & Planning</h4>
          <ul style="color: #4B5563; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Comprehensive requirements gathering and stakeholder interviews</li>
            <li style="margin-bottom: 8px;">Detailed technical architecture planning</li>
            <li style="margin-bottom: 8px;">Integration points identification</li>
            <li>Strategic resource allocation planning</li>
          </ul>
        </div>

        <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h4 style="color: #f65228; font-weight: 500; margin-bottom: 12px;">Phase 2: Development & Integration</h4>
          <ul style="color: #4B5563; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Custom AI model development and training</li>
            <li style="margin-bottom: 8px;">Secure API integrations setup</li>
            <li style="margin-bottom: 8px;">User interface development</li>
            <li>Performance optimization</li>
          </ul>
        </div>

        <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h4 style="color: #f65228; font-weight: 500; margin-bottom: 12px;">Phase 3: Testing & Training</h4>
          <ul style="color: #4B5563; padding-left: 20px;">
            <li style="margin-bottom: 8px;">System testing and security audits</li>
            <li style="margin-bottom: 8px;">Staff training sessions</li>
            <li style="margin-bottom: 8px;">Documentation creation</li>
            <li>Performance optimization</li>
          </ul>
        </div>

        <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px;">
          <h4 style="color: #f65228; font-weight: 500; margin-bottom: 12px;">Phase 4: Deployment & Support</h4>
          <ul style="color: #4B5563; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Production deployment</li>
            <li style="margin-bottom: 8px;">24/7 monitoring and maintenance</li>
            <li style="margin-bottom: 8px;">Performance tracking</li>
            <li>Ongoing improvements</li>
          </ul>
        </div>
      </div>

      <div style="background: #EFF6FF; border-radius: 8px; padding: 16px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Expected Outcomes</h3>
        <ul style="color: #4B5563; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Improved operational efficiency through automated workflows</li>
          <li style="margin-bottom: 8px;">Enhanced customer satisfaction with 24/7 availability</li>
          <li style="margin-bottom: 8px;">Substantial cost savings in operations</li>
          <li style="margin-bottom: 8px;">Future-proof scalable solution</li>
          <li>Quantifiable ROI through comprehensive analytics</li>
        </ul>
      </div>
    </div>
  `;
  doc.appendChild(implementationSection);
};