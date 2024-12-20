import { DetailedFormData } from "@/types/analysis";

export const generateHeaderSection = (doc: HTMLDivElement) => {
  const header = document.createElement('div');
  header.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem; padding: 1.5rem;">
      <div style="display: flex; align-items: center;">
        <img src="/lovable-uploads/0d15c757-0ac6-4cba-90a9-cc6ffef7b2f2.png" alt="Logo" style="height: 24px;" />
      </div>
      <div style="text-align: right; color: #4B5563; font-size: 0.875rem;">
        <p style="margin: 0 0 0.25rem 0; font-weight: 600;">Contact us:</p>
        <p style="margin: 0 0 0.25rem 0;">info@chatsites.ai</p>
        <p style="margin: 0 0 0.25rem 0;">+1 480 862 0288</p>
        <p style="margin: 0;">chatsites.ai</p>
      </div>
    </div>
  `;
  doc.appendChild(header);
};

export const generateCompanySection = (doc: HTMLDivElement, formData: DetailedFormData, industry: string) => {
  const companySection = document.createElement('div');
  companySection.innerHTML = `
    <div style="background: white; border-radius: 0.75rem; padding: 2rem; margin-bottom: 2rem; border: 1px solid #E5E7EB;">
      <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; color: #111827;">Company Information</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Company Name:</p>
          <p style="margin: 0 0 1.5rem 0; color: #4B5563;">${formData.companyName}</p>
          
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Contact Email:</p>
          <p style="margin: 0 0 1.5rem 0; color: #4B5563;">${formData.email}</p>
          
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Number of Employees:</p>
          <p style="margin: 0; color: #4B5563;">${formData.employees}</p>
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Industry:</p>
          <p style="margin: 0 0 1.5rem 0; color: #4B5563;">${industry}</p>
          
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Contact Phone:</p>
          <p style="margin: 0 0 1.5rem 0; color: #4B5563;">${formData.phoneNumber}</p>
          
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Annual Revenue:</p>
          <p style="margin: 0; color: #4B5563;">${formData.revenue}</p>
        </div>
      </div>
    </div>
  `;
  doc.appendChild(companySection);
};

export const generateOperationsSection = (doc: HTMLDivElement, formData: DetailedFormData) => {
  const operationsSection = document.createElement('div');
  operationsSection.innerHTML = `
    <div style="background: white; border-radius: 0.75rem; padding: 2rem; margin-bottom: 2rem; border: 1px solid #E5E7EB;">
      <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; color: #111827;">Current Operations</h2>
      <div style="display: grid; gap: 1.5rem;">
        <div>
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Service Channels:</p>
          <p style="margin: 0; color: #4B5563; line-height: 1.5;">${formData.serviceChannels}</p>
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Monthly Interactions:</p>
          <p style="margin: 0; color: #4B5563; line-height: 1.5;">${formData.monthlyInteractions}</p>
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Current Tools:</p>
          <p style="margin: 0; color: #4B5563; line-height: 1.5;">${formData.currentTools}</p>
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Pain Points:</p>
          <p style="margin: 0; color: #4B5563; line-height: 1.5;">${formData.painPoints}</p>
        </div>
      </div>
    </div>
  `;
  doc.appendChild(operationsSection);
};

export const generateAnalysisSection = (doc: HTMLDivElement, analysis: any) => {
  const analysisSection = document.createElement('div');
  analysisSection.innerHTML = `
    <div style="background: white; border-radius: 0.75rem; padding: 2rem; margin-bottom: 2rem; border: 1px solid #E5E7EB;">
      <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; color: #111827;">Analysis Results</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: #F9FAFB; border-radius: 0.5rem; padding: 1.5rem;">
          <p style="margin: 0 0 0.75rem 0; color: #374151; font-weight: 500;">Projected Annual Savings</p>
          <p style="margin: 0; color: #10B981; font-size: 1.75rem; font-weight: 600;">$${analysis.savings.toLocaleString()}</p>
        </div>
        <div style="background: #F9FAFB; border-radius: 0.5rem; padding: 1.5rem;">
          <p style="margin: 0 0 0.75rem 0; color: #374151; font-weight: 500;">Projected Profit Increase</p>
          <p style="margin: 0; color: #10B981; font-size: 1.75rem; font-weight: 600;">${analysis.profit_increase}%</p>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 0.75rem 0; font-weight: 500; color: #374151;">Recommended Implementation:</p>
        <p style="margin: 0; color: #4B5563; line-height: 1.6;">${analysis.explanation}</p>
      </div>
    </div>
  `;
  doc.appendChild(analysisSection);
};

export const generateImplementationSection = (doc: HTMLDivElement, formData: DetailedFormData) => {
  const implementationSection = document.createElement('div');
  implementationSection.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
      <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; line-height: 1.4;">Implementation Plan</h2>
      
      <div style="background: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; line-height: 1.4;">Project Overview</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="line-height: 1.5;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">Primary Objective:</p>
            <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.objectives}</p>
          </div>
          <div style="line-height: 1.5;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">Timeline:</p>
            <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.timeline}</p>
          </div>
          <div style="line-height: 1.5;">
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
        <ul style="margin: 0; padding-left: 20px; color: #4B5563; line-height: 1.5;">
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

const generatePhaseSection = (title: string, items: string[]) => `
  <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <h4 style="margin: 0 0 12px 0; color: #f65228; font-weight: 500; line-height: 1.4;">${title}</h4>
    <ul style="margin: 0; padding-left: 20px; color: #4B5563; line-height: 1.5;">
      ${items.map((item, index) => `
        <li style="margin-bottom: ${index === items.length - 1 ? '0' : '8px'};">${item}</li>
      `).join('')}
    </ul>
  </div>
`;

export const generateFooterSection = (doc: HTMLDivElement) => {
  const footer = document.createElement('div');
  footer.innerHTML = `
    <div style="text-align: center; color: #6B7280; font-size: 14px; margin-top: 40px; line-height: 1.5;">
      <p style="margin: 0 0 4px 0;">Generated by AI Analysis Tool</p>
      <p style="margin: 0;">www.chatsites.ai</p>
    </div>
  `;
  doc.appendChild(footer);
};
