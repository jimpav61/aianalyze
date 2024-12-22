import { DetailedFormData } from "@/types/analysis";

export const generateCompanySection = (doc: HTMLDivElement, formData: DetailedFormData, industry: string) => {
  const companySection = document.createElement('div');
  companySection.innerHTML = `
    <div style="background: #F1F0FB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1A1F2C;">Company Information</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Company Name:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.companyName}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Industry:</p>
          <p style="color: #6E59A5; margin: 0;">${industry}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Contact Email:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.email}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Contact Phone:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.phoneNumber}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Number of Employees:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.employees}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Annual Revenue:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.revenue}</p>
        </div>
      </div>
    </div>
  `;
  doc.appendChild(companySection);
};