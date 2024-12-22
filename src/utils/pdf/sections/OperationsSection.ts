import { DetailedFormData } from "@/types/analysis";

export const generateOperationsSection = (doc: HTMLDivElement, formData: DetailedFormData) => {
  const operationsSection = document.createElement('div');
  operationsSection.innerHTML = `
    <div style="background: #F1F0FB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1A1F2C;">Current Operations</h2>
      <div style="display: grid; gap: 16px;">
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Service Channels:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.serviceChannels || "Not specified"}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Monthly Interactions:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.monthlyInteractions || "Not specified"}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Current Tools:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.currentTools || "Not specified"}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Pain Points:</p>
          <p style="color: #6E59A5; margin: 0;">${formData.painPoints || "Not specified"}</p>
        </div>
      </div>
    </div>
  `;
  doc.appendChild(operationsSection);
};