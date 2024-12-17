import { useState } from "react";

export const useActionTracking = () => {
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasEmailed, setHasEmailed] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [showingToast, setShowingToast] = useState(false);

  const trackAction = (action: 'download' | 'email' | 'book') => {
    switch (action) {
      case 'download':
        setHasDownloaded(true);
        break;
      case 'email':
        setHasEmailed(true);
        break;
      case 'book':
        setHasBooked(true);
        break;
    }
  };

  return {
    hasDownloaded,
    hasEmailed,
    hasBooked,
    showingToast,
    setShowingToast,
    trackAction
  };
};