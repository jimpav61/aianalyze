import { DetailedFormData } from "@/types/analysis";

export const generateOperationsSection = (doc: HTMLDivElement, formData: DetailedFormData) => {
  const operationsSection = document.createElement('div');
  operationsSection.innerHTML = `
    <div style="background: white; border-radius: 0.75rem; padding: 2rem; margin-bottom: 2rem; border: 1px solid #E5E7EB;">
      <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; color: #111827; line-height: 1.4;">Current Operations</h2>
      <div style="display: grid; gap: 1.5rem;">
        <div style="line-height: 1.6;">
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Service Channels:</p>
          <p style="margin: 0; color: #4B5563;">${formData.serviceChannels}</p>
        </div>
        <div style="line-height: 1.6;">
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Monthly Interactions:</p>
          <p style="margin: 0; color: #4B5563;">${formData.monthlyInteractions}</p>
        </div>
        <div style="line-height: 1.6;">
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Current Tools:</p>
          <p style="margin: 0; color: #4B5563;">${formData.currentTools}</p>
        </div>
        <div style="line-height: 1.6;">
          <p style="margin: 0 0 0.5rem 0; font-weight: 500; color: #374151;">Pain Points:</p>
          <p style="margin: 0; color: #4B5563;">${formData.painPoints}</p>
        </div>
      </div>
    </div>
  `;
  doc.appendChild(operationsSection);
};