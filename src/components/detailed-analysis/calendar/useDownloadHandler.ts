import { useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { handlePdfDownload } from './pdfHandler';

export const useDownloadHandler = (getCurrentData: () => any) => {
  const { toast } = useToast();

  return useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentData = getCurrentData();
    
    console.log("[Calendar] Download initiated with data:", {
      hasFormData: !!currentData.formData,
      hasAnalysis: !!currentData.analysis,
      formDataContent: currentData.formData,
      analysisContent: currentData.analysis
    });

    if (!currentData.formData || !currentData.analysis) {
      console.error("[Calendar] Download failed: Missing data");
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    await handlePdfDownload({ currentData, toast });
  }, [getCurrentData, toast]);
};