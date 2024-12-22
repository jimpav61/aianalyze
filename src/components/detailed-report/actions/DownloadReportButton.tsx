import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

interface DownloadReportButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
  reportData?: any;
}

export const DownloadReportButton = ({ formData, analysis, reportData }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      // Create a clone to avoid modifying the original DOM
      const reportContainer = document.querySelector("#detailed-report");
      if (!reportContainer) {
        throw new Error("Report container not found");
      }

      const clone = reportContainer.cloneNode(true) as HTMLElement;
      document.body.appendChild(clone);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      
      // Process all images in the clone
      const images = Array.from(clone.getElementsByTagName('img'));
      console.log("Processing images:", images.length);
      
      await Promise.all(
        images.map(img => 
          new Promise((resolve) => {
            const originalSrc = img.src;
            // Convert relative URLs to absolute
            if (img.src.startsWith('/')) {
              img.src = window.location.origin + img.src;
            }
            // Remove port number if present
            img.src = img.src.replace(/:\d+\//, '/');
            
            console.log(`Processing image: ${originalSrc} -> ${img.src}`);
            
            if (img.complete) {
              console.log("Image already loaded:", img.src);
              resolve(null);
            } else {
              img.onload = () => {
                console.log("Image loaded successfully:", img.src);
                resolve(null);
              };
              img.onerror = () => {
                console.warn(`Failed to load image: ${img.src}`);
                // Instead of removing, replace with a placeholder or default image
                img.src = '/placeholder.svg';
                resolve(null);
              };
            }
          })
        )
      );

      const doc = await generateAnalysisReport({ formData, analysis });
      doc.save(`AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);

      document.body.removeChild(clone);

      toast({
        title: "Success",
        description: "Report downloaded successfully",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleDownload} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      Download Report
    </Button>
  );
};