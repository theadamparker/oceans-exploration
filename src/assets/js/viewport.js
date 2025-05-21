/**
 * Wrapper for UNDP Design System's viewport.min.js
 * 
 * This script provides a convenient way to interact with the globally loaded viewport script.
 * The script is loaded directly in index.html to ensure it's available globally.
 */

/**
 * Initialize the viewport detection with optional custom settings
 * @param options Optional configuration options
 */
export function initViewport(options = {}) {
  if (window.viewport) {
    window.viewport.init(options);
    return true;
  } else {
    console.warn('UNDP Viewport script not loaded. Check if the script is included in index.html');
    return false;
  }
}

/**
 * Check if the viewport script is available globally
 */
export function isViewportAvailable() {
  return !!window.viewport;
}

// Export a default object for convenience
export default {
  init: initViewport,
  isAvailable: isViewportAvailable
};
