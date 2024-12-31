import { DownloadOptions } from "./types";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

export const handlePdfDownload = async ({ currentData, toast }: DownloadOptions) => {
  try {
    const reportElement = document.getElementById('detailed-report');
    if (!reportElement) {
      console.error("[ReportHandler] Report element not found");
      throw new Error("Report element not found");
    }

    const pdf = await generateFullReport(currentData);
    const fileName = getReportFileName(currentData.formData?.companyName || 'report');
    pdf.save(fileName);
    
    toast({
      title: "Success",
      description: "Report downloaded successfully!",
      duration: 1500,
    });

    return true;
  } catch (error) {
    console.error('[Calendar] PDF Generation error:', error);
    toast({
      title: "Error",
      description: "Failed to download report. Please try again.",
      variant: "destructive",
      duration: 3000,
    });
    return false;
  }
};