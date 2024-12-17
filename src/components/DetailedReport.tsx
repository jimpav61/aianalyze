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
  const [hasBooked, setHasBooked] = useState(false);
  const [showingDownloadToast, setShowingDownloadToast] = useState(false);

  const handleBookDemo = () => {
    if (onBookDemo) {
      onBookDemo();
      setHasBooked(true);
    }
  };

  const handleDownloadComplete = () => {
    setHasDownloaded(true);
    setShowingDownloadToast(false);
    
    // Show booking reminder only if they haven't booked yet
    if (!hasBooked) {
      toast({
        title: "Ready for the Next Step?",
        description: "Would you like to book a demo to discuss implementing these solutions?",
        duration: 5000,
        action: (
          <button
            onClick={handleBookDemo}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium"
          >
            Book Demo
          </button>
        ),
      });
    }
  };

  useEffect(() => {
    // If they've booked but haven't downloaded/emailed the report
    if (hasBooked && !hasDownloaded && !showingDownloadToast) {
      setShowingDownloadToast(true);
      toast({
        title: "Don't Forget Your Report!",
        description: "Would you like to download or email your personalized AI implementation analysis report?",
        duration: null, // Toast will persist until dismissed
        action: (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                const downloadButton = document.querySelector<HTMLButtonElement>('[aria-label="Download PDF"]');
                if (downloadButton) {
                  downloadButton.click();
                  setShowingDownloadToast(false);
                }
              }}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium"
            >
              Download PDF
            </button>
            <button
              onClick={() => {
                const emailButton = document.querySelector<HTMLButtonElement>('[aria-label="Email Report"]');
                if (emailButton) {
                  emailButton.click();
                  setShowingDownloadToast(false);
                }
              }}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium"
            >
              Email Report
            </button>
          </div>
        ),
      });
    }
  }, [hasBooked, hasDownloaded, showingDownloadToast, toast]);

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