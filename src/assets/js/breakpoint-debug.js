// Breakpoint Debug Helper
// This script adds a visual indicator of the current breakpoint during development

(function() {
  if (process.env.NODE_ENV !== 'development') return;
  
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
})();
