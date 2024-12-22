interface ImplementationData {
  objectives?: string;
  timeline?: string;
  budget?: string;
  additionalInfo?: string;
}

export const generateImplementationSection = (doc: HTMLDivElement, data: ImplementationData) => {
  const implementationSection = document.createElement('div');
  implementationSection.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Implementation Plan</h2>
      <div style="display: grid; gap: 16px;">
        ${data.objectives ? `
          <div>
            <p style="font-weight: 500; color: #374151; margin-bottom: 4px;">Key Objectives:</p>
            <p style="color: #4B5563; margin: 0;">${data.objectives}</p>
          </div>
        ` : ''}
        ${data.timeline ? `
          <div>
            <p style="font-weight: 500; color: #374151; margin-bottom: 4px;">Implementation Timeline:</p>
            <p style="color: #4B5563; margin: 0;">${data.timeline}</p>
          </div>
        ` : ''}
        ${data.budget ? `
          <div>
            <p style="font-weight: 500; color: #374151; margin-bottom: 4px;">Budget Considerations:</p>
            <p style="color: #4B5563; margin: 0;">${data.budget}</p>
          </div>
        ` : ''}
        ${data.additionalInfo ? `
          <div>
            <p style="font-weight: 500; color: #374151; margin-bottom: 4px;">Additional Information:</p>
            <p style="color: #4B5563; margin: 0;">${data.additionalInfo}</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  doc.appendChild(implementationSection);
};