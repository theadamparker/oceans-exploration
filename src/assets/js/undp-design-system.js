/**
 * UNDP Design System Integration
 * Utility functions to handle UNDP design system initialization
 * 
 * This module provides a centralized way to interact with the UNDP Design System scripts
 * and components without duplicate script loading.
 */

// Re-export the viewport initialization functions for use elsewhere
import { initViewport } from './viewport.js';
export { initViewport };

/**
 * Initializes the UNDP design system components
 * Call this function after DOM changes that might affect UNDP components
 */
export function initUndpComponents() {
  // Check if window.UNDP_JS_INIT exists (the init function from the UNDP design system)
  if (window.UNDP_JS_INIT) {
    window.UNDP_JS_INIT.init();
  }
}

/**
 * Ensure a script is loaded by checking if it exists and adding it if not
 * @param {string} id - ID for the script element
 * @param {string} src - Script source URL
 * @param {HTMLElement} target - Where to append the script (head or body)
 * @param {Object} attributes - Additional attributes to add to the script tag
 * @returns {Promise} - Resolves when the script is loaded
 */
function ensureScriptLoaded(id, src, target = document.head, attributes = {}) {
  return new Promise((resolve) => {
    // If script with this ID already exists, just resolve
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    
    // Add any additional attributes
    Object.entries(attributes).forEach(([key, value]) => {
      script[key] = value;
    });
    
    script.onload = () => resolve();
    target.appendChild(script);
  });
}

// Bootstrap all required UNDP scripts when in browser environment
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // Load jQuery if not already available
    if (typeof window.jQuery === 'undefined') {
      ensureScriptLoaded('jquery-script', 
        'https://code.jquery.com/jquery-3.7.1.min.js', 
        document.head, 
        { 
          integrity: 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=',
          crossOrigin: 'anonymous'
        }
      );
    }
    
    // Load viewport script
    ensureScriptLoaded('viewport-script', 
      'https://cdn.jsdelivr.net/npm/@undp/design-system/docs/js/viewport.min.js', 
      document.head
    );

    // Load lang-switcher script
    ensureScriptLoaded('lang-switcher-script',
      'https://cdn.jsdelivr.net/npm/@undp/design-system/docs/js/lang-switcher.min.js',
      document.head
    );
    
    // Initialize components after a short delay to ensure scripts are loaded
    setTimeout(() => {
      initUndpComponents();
    }, 300);
  });
}
