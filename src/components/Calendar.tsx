import { useEffect, useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { LoadingState } from "./calendar/LoadingState";
import { ErrorState } from "./calendar/ErrorState";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { toast } from "@/components/ui/use-toast";

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  console.log("Calendar - Rendering with link:", calLink);
  
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const initAttempted = useRef(false);
  const errorShown = useRef(false);
  
  const { handleBookingSuccess } = useBookingSuccess({ 
    formData, 
    analysis, 
    onSubmit 
  });

  useEffect(() => {
    if (initAttempted.current) return;
    
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
      initAttempted.current = true;
    };
    
    script.onerror = () => {
      setScriptError('Failed to load calendar script - please refresh the page');
      initAttempted.current = true;
    };
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptError && !errorShown.current) {
      console.error("Calendar - Script error:", scriptError);
      toast({
        title: "Calendar Error",
        description: scriptError,
        variant: "destructive",
      });
      errorShown.current = true;
    }
  }, [scriptError]);

  useEffect(() => {
    if (!isScriptLoaded) return;

    // Initialize Calendly widget
    const calendlyUrl = `https://calendly.com/${calLink}`;
    
    // @ts-ignore - Calendly types are not available
    Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: document.getElementById('calendly-booking-placeholder'),
      prefill: {},
      utm: {}
    });

    // Listen for booking success
    // @ts-ignore - Calendly types are not available
    window.addEventListener('calendly.event_scheduled', handleBookingSuccess);

    return () => {
      // @ts-ignore - Calendly types are not available
      window.removeEventListener('calendly.event_scheduled', handleBookingSuccess);
    };
  }, [isScriptLoaded, calLink, handleBookingSuccess]);

  if (scriptError) {
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    console.log("Calendar - Script not loaded yet, showing loading state");
    return <LoadingState />;
  }

  console.log("Calendar - Rendering calendar placeholder");
  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        id="calendly-booking-placeholder" 
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};