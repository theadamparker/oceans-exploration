// Declaration file for UNDP viewport script
// This declares any globals provided by the viewport.min.js script

interface ViewportOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

interface ViewportAPI {
  /**
   * Initialize viewport detection on elements with data-viewport attribute
   */
  init(options?: ViewportOptions): void;
}

// Declare the global viewport object if it exists
declare global {
  interface Window {
    viewport?: ViewportAPI;
  }
}

export {};
