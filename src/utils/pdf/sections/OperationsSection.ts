import { DetailedFormData } from "@/types/analysis";

export const generateOperationsSection = (doc: HTMLDivElement, formData: DetailedFormData) => {
  const operationsSection = document.createElement('div');
  operationsSection.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Current Operations</h2>
      <div style="display: grid; gap: 24px;">
        <div>
          <p style="font-weight: 500; color: #374151;">Service Channels:</p>
          <p style="color: #4B5563;">${formData.serviceChannels}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151;">Monthly Interactions:</p>
          <p style="color: #4B5563;">${formData.monthlyInteractions}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151;">Current Tools:</p>
          <p style="color: #4B5563;">${formData.currentTools}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151;">Pain Points:</p>
          <p style="color: #4B5563;">${formData.painPoints}</p>
        </div>
      </div>
    </div>
  `;
  doc.appendChild(operationsSection);
};