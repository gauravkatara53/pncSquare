export const GA_TRACKING_ID = "G-9N9M9GMFYP"; // Replace with your GA4 Measurement ID

// Define the type for event parameters
export interface EventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Track page views
export const pageview = (url: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }: EventProps): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
