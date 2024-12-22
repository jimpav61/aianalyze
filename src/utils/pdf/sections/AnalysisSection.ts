export const generateAnalysisSection = (doc: HTMLDivElement, analysis: any) => {
  const analysisSection = document.createElement('div');
  analysisSection.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #E5E7EB;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Analysis Results</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div style="background: #F9FAFB; border-radius: 8px; padding: 16px;">
          <p style="font-weight: 500; color: #374151; margin-bottom: 8px;">Projected Annual Savings</p>
          <p style="color: #10B981; font-size: 24px; font-weight: 600;">$${analysis.savings.toLocaleString()}</p>
        </div>
        <div style="background: #F9FAFB; border-radius: 8px; padding: 16px;">
          <p style="font-weight: 500; color: #374151; margin-bottom: 8px;">Projected Profit Increase</p>
          <p style="color: #10B981; font-size: 24px; font-weight: 600;">${analysis.profit_increase}%</p>
        </div>
      </div>
      <div>
        <p style="font-weight: 500; color: #374151; margin-bottom: 8px;">Implementation Strategy:</p>
        <p style="color: #4B5563;">${analysis.explanation}</p>
      </div>
      <div style="margin-top: 16px;">
        <p style="font-weight: 500; color: #374151; margin-bottom: 8px;">Marketing Strategy:</p>
        <p style="color: #4B5563;">${analysis.marketing_strategy}</p>
      </div>
    </div>
  `;
  doc.appendChild(analysisSection);
};