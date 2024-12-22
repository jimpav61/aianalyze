import { DetailedFormData } from "@/types/analysis";

export const generateCompanySection = (doc: HTMLDivElement, formData: DetailedFormData, industry: string) => {
  const companySection = document.createElement('div');
  companySection.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Company Information</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <p style="font-weight: 500; color: #374151;">Company Name:</p>
          <p style="color: #4B5563;">${formData.companyName}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151;">Industry:</p>
          <p style="color: #4B5563;">${industry}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151;">Contact Email:</p>
          <p style="color: #4B5563;">${formData.email}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151;">Contact Phone:</p>
          <p style="color: #4B5563;">${formData.phoneNumber}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151;">Number of Employees:</p>
          <p style="color: #4B5563;">${formData.employees}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151;">Annual Revenue:</p>
          <p style="color: #4B5563;">${formData.revenue}</p>
        </div>
      </div>
    </div>
  `;
  doc.appendChild(companySection);
};