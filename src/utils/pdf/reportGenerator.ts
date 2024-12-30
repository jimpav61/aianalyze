import { DetailedFormData } from "@/types/analysis";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

interface GenerateReportPDFParams {
  formData: DetailedFormData;
  analysis: any;
}

export const generateReportPDF = async ({ formData, analysis }: GenerateReportPDFParams) => {
  // Create a temporary container for the report
  const tempContainer = document.createElement('div');
  tempContainer.id = 'temp-detailed-report';
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  document.body.appendChild(tempContainer);

  try {
    // Add minimal content for PDF generation
    tempContainer.innerHTML = `
      <div class="space-y-8">
        <h2 class="text-2xl font-bold">AI Implementation Analysis</h2>
        <div class="space-y-4">
          <h3 class="text-xl">Company Information</h3>
          <p>Company: ${formData.companyName}</p>
          <p>Industry: ${analysis.industry}</p>
          <p>Department: ${analysis.department}</p>
          <h3 class="text-xl">Analysis Results</h3>
          <p>Projected Savings: $${analysis.savings.toLocaleString()}</p>
          <p>Profit Increase: ${analysis.profit_increase}%</p>
          <p>${analysis.explanation}</p>
          <p>${analysis.marketing_strategy}</p>
        </div>
      </div>
    `;

    // Wait for the temporary container to be ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    const pdf = await generateAnalysisReport({ 
      formData, 
      analysis,
      reportElement: tempContainer 
    });

    return { pdf, fileName };
  } finally {
    // Clean up the temporary container
    document.body.removeChild(tempContainer);
  }
};