import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { DetailedFormData } from "@/types/analysis";

interface GenerateReportParams {
  formData: DetailedFormData;
  analysis: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
    allAnalyses?: any[];
  };
}

export const generateAnalysisReport = async ({ formData, analysis }: GenerateReportParams): Promise<jsPDF> => {
  const reportContainer = document.createElement('div');
  reportContainer.style.width = '800px';
  reportContainer.style.padding = '40px';
  reportContainer.style.background = 'white';
  reportContainer.style.fontFamily = 'Inter, sans-serif';
  document.body.appendChild(reportContainer);

  reportContainer.innerHTML = `
    <div style="font-family: Inter, system-ui, sans-serif;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="/lovable-uploads/1b6619ed-f854-4bba-87ff-33cca6d20e9a.png" alt="ChatSites Logo" style="height: 32px;" />
          <span style="font-size: 24px; font-weight: bold; color: #f65228;">ChatSites</span>
        </div>
        <div style="text-align: right; color: #4B5563; font-size: 14px;">
          <p style="margin: 0; font-weight: 600;">Contact us:</p>
          <p style="margin: 4px 0;">info@chatsites.ai</p>
          <p style="margin: 4px 0;">+1 480 862 0288</p>
          <p style="margin: 4px 0;">chatsites.ai</p>
        </div>
      </div>

      <!-- Company Information -->
      <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
        <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Company Information</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <p style="margin: 0 0 4px 0; font-weight: 500;">Company Name:</p>
            <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.companyName}</p>
            
            <p style="margin: 0 0 4px 0; font-weight: 500;">Contact Email:</p>
            <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.email}</p>
            
            <p style="margin: 0 0 4px 0; font-weight: 500;">Number of Employees:</p>
            <p style="margin: 0; color: #4B5563;">${formData.employees}</p>
          </div>
          <div>
            <p style="margin: 0 0 4px 0; font-weight: 500;">Industry:</p>
            <p style="margin: 0 0 16px 0; color: #4B5563;">${analysis.industry}</p>
            
            <p style="margin: 0 0 4px 0; font-weight: 500;">Contact Phone:</p>
            <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.phoneNumber}</p>
            
            <p style="margin: 0 0 4px 0; font-weight: 500;">Annual Revenue:</p>
            <p style="margin: 0; color: #4B5563;">${formData.revenue}</p>
          </div>
        </div>
      </div>

      <!-- Current Operations -->
      <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
        <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Current Operations</h2>
        <div style="space-y-4">
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">Service Channels:</p>
            <p style="margin: 0; color: #4B5563;">${formData.serviceChannels}</p>
          </div>
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">Monthly Interactions:</p>
            <p style="margin: 0; color: #4B5563;">${formData.monthlyInteractions}</p>
          </div>
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">Current Tools:</p>
            <p style="margin: 0; color: #4B5563;">${formData.currentTools}</p>
          </div>
          <div>
            <p style="margin: 0 0 4px 0; font-weight: 500;">Pain Points:</p>
            <p style="margin: 0; color: #4B5563;">${formData.painPoints}</p>
          </div>
        </div>
      </div>

      <!-- Analysis Results -->
      <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
        <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Analysis Results</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #E5E7EB;">
            <p style="margin: 0 0 8px 0; color: #4B5563;">Projected Annual Savings</p>
            <p style="margin: 0; color: #10B981; font-size: 24px; font-weight: 600;">$${analysis.savings.toLocaleString()}</p>
          </div>
          <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #E5E7EB;">
            <p style="margin: 0 0 8px 0; color: #4B5563;">Projected Profit Increase</p>
            <p style="margin: 0; color: #10B981; font-size: 24px; font-weight: 600;">
              <span style="font-size: 24px;">${analysis.profit_increase}</span>
              <span style="font-size: 20px;">%</span>
            </p>
          </div>
        </div>
        <div>
          <p style="margin: 0 0 8px 0; font-weight: 500;">Recommended Implementation:</p>
          <p style="margin: 0; color: #4B5563;">${analysis.explanation}</p>
        </div>
      </div>

      <!-- Implementation Plan -->
      <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
        <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Implementation Plan</h2>
        
        <!-- Project Overview -->
        <div style="background: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Project Overview</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <p style="margin: 0 0 4px 0; font-weight: 500;">Primary Objective:</p>
              <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.objectives}</p>
            </div>
            <div>
              <p style="margin: 0 0 4px 0; font-weight: 500;">Timeline:</p>
              <p style="margin: 0 0 16px 0; color: #4B5563;">${formData.timeline}</p>
            </div>
            <div>
              <p style="margin: 0 0 4px 0; font-weight: 500;">Budget Allocation:</p>
              <p style="margin: 0; color: #4B5563;">${formData.budget}</p>
            </div>
          </div>
        </div>

        <!-- Implementation Phases -->
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Implementation Phases</h3>
        
        <!-- Phase 1 -->
        <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #f65228; font-weight: 500;">Phase 1: Discovery & Planning</h4>
          <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
            <li style="margin-bottom: 8px;">Comprehensive requirements gathering and stakeholder interviews to ensure alignment with business objectives</li>
            <li style="margin-bottom: 8px;">Detailed technical architecture planning including infrastructure assessment and capacity planning</li>
            <li style="margin-bottom: 8px;">Thorough integration points identification and API compatibility analysis</li>
            <li style="margin-bottom: 0;">Strategic resource allocation planning and team structure definition</li>
          </ul>
        </div>

        <!-- Phase 2 -->
        <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #f65228; font-weight: 500;">Phase 2: Development & Integration</h4>
          <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
            <li style="margin-bottom: 8px;">Custom AI model development and training with industry-specific data sets</li>
            <li style="margin-bottom: 8px;">Secure API integrations setup with existing systems and third-party services</li>
            <li style="margin-bottom: 8px;">Intuitive user interface development with focus on user experience</li>
            <li style="margin-bottom: 0;">Comprehensive testing and performance optimization for scalability</li>
          </ul>
        </div>

        <!-- Phase 3 -->
        <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #f65228; font-weight: 500;">Phase 3: Testing & Training</h4>
          <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
            <li style="margin-bottom: 8px;">Rigorous system testing including load testing, security audits, and quality assurance</li>
            <li style="margin-bottom: 8px;">In-depth staff training sessions covering all system features and best practices</li>
            <li style="margin-bottom: 8px;">Detailed documentation creation including user guides and technical specifications</li>
            <li style="margin-bottom: 0;">Advanced performance optimization for maximum efficiency</li>
          </ul>
        </div>

        <!-- Phase 4 -->
        <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #f65228; font-weight: 500;">Phase 4: Deployment & Support</h4>
          <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
            <li style="margin-bottom: 8px;">Carefully planned production deployment with minimal disruption</li>
            <li style="margin-bottom: 8px;">24/7 monitoring and proactive maintenance to ensure optimal performance</li>
            <li style="margin-bottom: 8px;">Continuous performance tracking and analytics for ROI measurement</li>
            <li style="margin-bottom: 0;">Ongoing system improvements based on user feedback and usage patterns</li>
          </ul>
        </div>

        <!-- Expected Outcomes -->
        <div style="background: #EFF6FF; border-radius: 8px; padding: 16px;">
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Expected Outcomes</h3>
          <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
            <li style="margin-bottom: 8px;">Improved operational efficiency through automated workflows, reducing manual workload by up to 40% and enabling staff to focus on high-value tasks</li>
            <li style="margin-bottom: 8px;">Enhanced customer satisfaction with 24/7 availability, instant response times, and personalized interactions leading to increased customer retention</li>
            <li style="margin-bottom: 8px;">Substantial cost savings in customer service operations through reduced handling time and optimized resource allocation</li>
            <li style="margin-bottom: 8px;">Future-proof scalable solution that adapts to growing business needs with built-in analytics and learning capabilities</li>
            <li style="margin-bottom: 0;">Quantifiable ROI through comprehensive analytics, including customer satisfaction scores, resolution rates, and operational cost reduction metrics</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; color: #6B7280; font-size: 14px; margin-top: 40px;">
        <p style="margin: 0 0 4px 0;">Generated by ChatSites AI Analysis Tool</p>
        <p style="margin: 0;">www.chatsites.ai</p>
      </div>
    </div>
  `;

  try {
    const canvas = await html2canvas(reportContainer, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: 800,
      height: reportContainer.offsetHeight
    });

    document.body.removeChild(reportContainer);

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    let heightLeft = imgHeight;
    let position = 0;
    const totalPages = Math.ceil(imgHeight / pageHeight);

    for (let page = 1; page <= totalPages; page++) {
      if (page > 1) {
        pdf.addPage();
      }

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );

      heightLeft -= pageHeight;
      position -= pageHeight;
    }

    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};