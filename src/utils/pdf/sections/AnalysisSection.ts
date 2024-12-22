export const generateAnalysisSection = (doc: HTMLDivElement, analysis: any) => {
  const analysisSection = document.createElement('div');
  analysisSection.innerHTML = `
    <div style="background: #F1F0FB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1A1F2C;">Analysis Results</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div style="background: #E5DEFF; border-radius: 8px; padding: 16px;">
          <p style="font-weight: 500; color: #403E43; margin-bottom: 8px;">Primary Department:</p>
          <p style="color: #6E59A5; margin: 0;">${analysis.department}</p>
          <p style="font-weight: 500; color: #403E43; margin: 8px 0;">Primary Function:</p>
          <p style="color: #6E59A5; margin: 0;">${analysis.bot_function}</p>
        </div>
        <div style="background: #E5DEFF; border-radius: 8px; padding: 16px;">
          <p style="font-weight: 500; color: #403E43; margin-bottom: 8px;">Projected Annual Savings:</p>
          <p style="color: #8B5CF6; font-size: 24px; font-weight: 600; margin: 0;">$${analysis.savings.toLocaleString()}</p>
          <p style="font-weight: 500; color: #403E43; margin: 8px 0;">Projected Profit Increase:</p>
          <p style="color: #8B5CF6; font-size: 24px; font-weight: 600; margin: 0;">${analysis.profit_increase}%</p>
        </div>
      </div>
      <div style="margin-bottom: 16px;">
        <p style="font-weight: 500; color: #403E43; margin-bottom: 8px;">Implementation Strategy:</p>
        <p style="color: #6E59A5; margin: 0;">${analysis.explanation}</p>
      </div>
      <div>
        <p style="font-weight: 500; color: #403E43; margin-bottom: 8px;">Marketing Strategy:</p>
        <p style="color: #6E59A5; margin: 0;">${analysis.marketing_strategy}</p>
      </div>
    </div>
  `;
  doc.appendChild(analysisSection);
};