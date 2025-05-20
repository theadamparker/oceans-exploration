// Breakpoint Debug Helper
// This script adds a visual indicator of the current breakpoint during development

/**
 * Initialize the breakpoint debug display
 * Creates a visual indicator showing the current viewport width and breakpoint
 */
export function initBreakpointDebug() {
  // Skip in production mode
  if (typeof import.meta === 'undefined' || !import.meta.env || !import.meta.env.DEV) return;
  
  // Create the indicator element
  const indicator = document.createElement('div');
  indicator.style.position = 'fixed';
  indicator.style.bottom = '10px';
  indicator.style.right = '10px';
  indicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  indicator.style.color = 'white';
  indicator.style.padding = '5px 10px';
  indicator.style.borderRadius = '4px';
  indicator.style.fontSize = '12px';
  indicator.style.fontFamily = 'monospace';
  indicator.style.zIndex = '9999';
  
  // Update the text based on window width
  function updateBreakpointText() {
    const width = window.innerWidth;
    let text = '';
    
    if (width < 768) {
      text = 'small (mobile)';
    } else if (width < 1024) {
      text = 'medium (tablet)';
    } else if (width < 1440) {
      text = 'large (desktop)';
    } else {
      text = 'xlarge (large desktop)';
    }
    
    indicator.textContent = `${width}px - ${text}`;
  }
  
  // Initial update
  updateBreakpointText();
  
  // Update on resize
  window.addEventListener('resize', updateBreakpointText);
  
  // Add to the DOM
  document.body.appendChild(indicator);
}

// Run when module is loaded if in development mode
if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
  // Only auto-initialize if in browser environment
  if (typeof document !== 'undefined') {
    initBreakpointDebug();
  }
}

// Export for explicit usage
export default initBreakpointDebug;
