import { useState, useEffect, useRef } from 'react';
import { toast } from "@/components/ui/use-toast";

export const useCalendarScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const initAttempted = useRef(false);
  const errorShown = useRef(false);

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

  return { isScriptLoaded, scriptError };
};