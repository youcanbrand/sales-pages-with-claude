import { useEffect, useRef } from 'react';

// Analytics hook - centralized analytics tracking

export const useAnalytics = (productId, productName) => {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!trackedRef.current) {
      console.log('Analytics: Page view tracked', { productId, productName });
      trackedRef.current = true;
    }
  }, [productId, productName]);

  const trackEvent = (eventName, data) => {
    console.log(`Analytics: ${eventName}`, data);
  };

  return { trackEvent };
};
