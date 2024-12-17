import { useCallback } from "react";

interface UseReportActionsProps {
  onBookDemo?: () => void;
}

export const useReportActions = ({ onBookDemo }: UseReportActionsProps) => {
  const handleBookDemo = useCallback(() => {
    console.log("Handling book demo");
    if (onBookDemo) {
      onBookDemo();
    }
  }, [onBookDemo]);

  const handleReportAction = useCallback((type: 'download' | 'email') => {
    console.log(`Handling report action: ${type}`);
  }, []);

  return {
    handleBookDemo,
    handleReportAction
  };
};