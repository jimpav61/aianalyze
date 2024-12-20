import { DetailedFormData } from "@/types/analysis";

export const generateCompanySection = (doc: HTMLDivElement, formData: DetailedFormData, industry: string) => {
  const companySection = document.createElement('div');
  companySection.innerHTML = `
    <div style="background: white; border-radius: 0.75rem; padding: 2rem; margin-bottom: 2rem; border: 1px solid #E5E7EB;">
      <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; color: #111827; line-height: 1.4;">Company Information</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div style="line-height: 1.8;">
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Company Name:</p>
          <p style="margin: 0 0 1.5rem 0; color: #4B5563;">${formData.companyName}</p>
          
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Contact Email:</p>
          <p style="margin: 0 0 1.5rem 0; color: #4B5563;">${formData.email}</p>
          
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Number of Employees:</p>
          <p style="margin: 0; color: #4B5563;">${formData.employees}</p>
        </div>
        <div style="line-height: 1.8;">
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