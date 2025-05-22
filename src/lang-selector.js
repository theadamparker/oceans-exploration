/**
 * Script for redirecting users to their preferred language version
 * This script is used on the main index.html file to redirect users
 * based on their browser language preference
 */

// Detect user's preferred language
function detectLanguage() {
  const userLang = navigator.language || navigator.userLanguage || 'en';
  const lang = userLang.split('-')[0];
  
  // Redirect based on detected language
  if (lang === 'es') {
    window.location.href = './es/';
  } else if (lang === 'fr') {
    window.location.href = './fr/';
  } else {
    // Default to English for any other language
    window.location.href = './';
  }
}

// Export for use in other modules
export { detectLanguage };

// Auto-run the detection if this script is loaded directly
if (document.currentScript) {
  detectLanguage();
}
