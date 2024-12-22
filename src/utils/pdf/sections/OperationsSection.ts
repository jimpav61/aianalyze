import { DetailedFormData } from "@/types/analysis";

export const generateOperationsSection = (doc: HTMLDivElement, formData: DetailedFormData) => {
  const operationsSection = document.createElement('div');
  operationsSection.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Current Operations</h2>
      <div style="display: grid; gap: 16px;">
        <div>
          <p style="font-weight: 500; color: #374151; margin-bottom: 4px;">Service Channels:</p>
          <p style="color: #4B5563; margin: 0;">${formData.serviceChannels || "Not specified"}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151; margin-bottom: 4px;">Monthly Interactions:</p>
          <p style="color: #4B5563; margin: 0;">${formData.monthlyInteractions || "Not specified"}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151; margin-bottom: 4px;">Current Tools:</p>
          <p style="color: #4B5563; margin: 0;">${formData.currentTools || "Not specified"}</p>
        </div>
        <div>
          <p style="font-weight: 500; color: #374151; margin-bottom: 4px;">Pain Points:</p>
          <p style="color: #4B5563; margin: 0;">${formData.painPoints || "Not specified"}</p>
        </div>
      </div>
    </div>
  `;
  doc.appendChild(operationsSection);
};