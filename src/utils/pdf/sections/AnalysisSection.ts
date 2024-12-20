export const generateAnalysisSection = (doc: HTMLDivElement, analysis: any) => {
  const analysisSection = document.createElement('div');
  analysisSection.innerHTML = `
    <div style="background: white; border-radius: 0.75rem; padding: 2rem; margin-bottom: 2rem; border: 1px solid #E5E7EB;">
      <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; color: #111827; line-height: 1.4;">Analysis Results</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: #F9FAFB; border-radius: 0.5rem; padding: 1.5rem;">
          <p style="margin: 0 0 0.75rem 0; color: #374151; font-weight: 500; line-height: 1.4;">Projected Annual Savings</p>
          <p style="margin: 0; color: #10B981; font-size: 1.75rem; font-weight: 600;">$${analysis.savings.toLocaleString()}</p>
        </div>
        <div style="background: #F9FAFB; border-radius: 0.5rem; padding: 1.5rem;">
          <p style="margin: 0 0 0.75rem 0; color: #374151; font-weight: 500; line-height: 1.4;">Projected Profit Increase</p>
          <p style="margin: 0; color: #10B981; font-size: 1.75rem; font-weight: 600;">${analysis.profit_increase}%</p>
        </div>
      </div>
      <div style="line-height: 1.6;">
        <p style="margin: 0 0 0.75rem 0; font-weight: 500; color: #374151;">Recommended Implementation:</p>
        <p style="margin: 0; color: #4B5563;">${analysis.explanation}</p>
      </div>
    </div>
  `;
  doc.appendChild(analysisSection);
};