import { Separator } from "./ui/separator";
import { ReportHeader } from "./detailed-report/ReportHeader";
import { CompanyInformation } from "./detailed-report/CompanyInformation";
import { AnalysisResults } from "./detailed-report/AnalysisResults";
import { CurrentOperations } from "./detailed-report/CurrentOperations";
import { ImplementationPlan } from "./detailed-report/ImplementationPlan";
import { ReportFooter } from "./detailed-report/ReportFooter";
import { AnalysisGrid } from "./AnalysisGrid";
import { ReportActions } from "./detailed-report/ReportActions";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DetailedReportProps {
  data: {
    companyName: string;
    phoneNumber: string;
    email: string;
    employees: string;
    revenue: string;
    serviceChannels: string;
    monthlyInteractions: string;
    currentTools: string;
    painPoints: string;
    objectives: string;
    timeline: string;
    budget: string;
    additionalInfo: string;
  };
  analysis: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  };
  analyses: any[];
  onBookDemo?: () => void;
}

export const DetailedReport = ({ data, analysis, analyses, onBookDemo }: DetailedReportProps) => {
  const { toast } = useToast();
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [showingDownloadToast, setShowingDownloadToast] = useState(false);
  const [hasSubmittedBooking, setHasSubmittedBooking] = useState(false);

  const handleBookDemo = () => {
    onBookDemo?.();
    setHasSubmittedBooking(true);
  };

  useEffect(() => {
    if (hasSubmittedBooking && !hasDownloaded && !showingDownloadToast) {
      setShowingDownloadToast(true);
      toast({
        title: "Don't Forget Your Report!",
        description: "Would you like to download or email your personalized AI implementation analysis report?",
        duration: null, // Toast will persist until dismissed
        variant: "destructive",
        action: (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                document.querySelector<HTMLButtonElement>('[aria-label="Download PDF"]')?.click();
                setShowingDownloadToast(false);
              }}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium"
            >
              Download PDF
            </button>
            <button
              onClick={() => {
                document.querySelector<HTMLButtonElement>('[aria-label="Email Report"]')?.click();
                setShowingDownloadToast(false);
              }}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium"
            >
              Email Report
            </button>
          </div>
        ),
      });
    }
  }, [hasSubmittedBooking, hasDownloaded, showingDownloadToast, toast]);

  const handleDownloadComplete = () => {
    setHasDownloaded(true);
    setShowingDownloadToast(false);
    toast({
      title: "Thank you!",
      description: "Your report has been saved successfully.",
      duration: 3000,
    });
  };

  if (!data || !analysis || typeof analysis !== 'object') {
    console.error("DetailedReport - Missing or invalid data:", { data, analysis });
    return null;
  }

  const requiredFields = ['industry', 'department', 'bot_function', 'savings', 'profit_increase', 'explanation', 'marketing_strategy'];
  const missingFields = requiredFields.filter(field => !(field in analysis));
  
  if (missingFields.length > 0) {
    console.error("DetailedReport - Missing required analysis fields:", missingFields);
    return null;
  }

  return (
    <div className="relative">
      <ReportActions 
        companyName={data.companyName}
        email={data.email}
        onBookDemo={handleBookDemo}
        onDownloadComplete={handleDownloadComplete}
      />

      <div id="detailed-report" className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <ReportHeader />
        <Separator className="mb-8" />

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          AI Implementation Analysis Report
        </h1>

        <CompanyInformation data={data} industry={analysis.industry} />
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">AI Implementation Options</h2>
          <AnalysisGrid analyses={analyses} />
        </div>

        <AnalysisResults analysis={analysis} />
        <CurrentOperations data={data} />
        <ImplementationPlan data={data} />
        <ReportFooter />
      </div>
    </div>
  );
};