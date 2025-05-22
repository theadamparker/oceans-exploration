// postbuild.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { minify } from 'html-minifier-terser';
import { fileURLToPath } from 'url';

console.log('Running post-build script for static site generation...');

// Get current file directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL for assets and links
const baseUrl = process.env.BASE_URL || '/';
const isProd = process.env.NODE_ENV === 'production';

// Determine GitHub organization/username from git config or environment variables
let githubUsername = 'yourusername';
try {
  // First, check if we're in GitHub Actions
  if (process.env.GITHUB_REPOSITORY) {
    const repoPath = process.env.GITHUB_REPOSITORY;
    const orgRepo = repoPath.split('/');
    if (orgRepo.length === 2) {
      githubUsername = orgRepo[0];
      console.log(`Using GitHub username from GITHUB_REPOSITORY: ${githubUsername}`);
    }
  } else {
    // Try to get the GitHub username from the remote URL
    const remoteUrl = execSync('git remote get-url origin').toString().trim();
    const match = remoteUrl.match(/github\.com[\/:]([^\/]+)\/oceans-exploration/);
    if (match && match[1]) {
      githubUsername = match[1];
      console.log(`Using GitHub username from git remote: ${githubUsername}`);
    }
  }
} catch (err) {
  console.log('Could not determine GitHub username, using default');
}

// Domain for canonical URLs - this will be used throughout the script
const domain = process.env.BASE_URL === '/turning-the-tide/' 
  ? `https://${githubUsername}.github.io/turning-the-tide` 
  : 'https://your-production-domain.com';

// Define paths
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.resolve(distPath, 'index.html');
const esPath = path.resolve(distPath, 'es');
const frPath = path.resolve(distPath, 'fr');
const esIndexPath = path.resolve(esPath, 'index.html');
const frIndexPath = path.resolve(frPath, 'index.html');

// Ensure language directories exist
if (!fs.existsSync(esPath)) {
  fs.mkdirSync(esPath, { recursive: true });
  console.log('Created directory:', esPath);
}

if (!fs.existsSync(frPath)) {
  fs.mkdirSync(frPath, { recursive: true });
  console.log('Created directory:', frPath);
}

// Function to optimize HTML content
async function optimizeHtml(htmlContent) {
  try {
    const minifiedHtml = await minify(htmlContent, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    });
    return minifiedHtml;
  } catch (err) {
    console.error('Error minifying HTML:', err);
    return htmlContent; // Return original content if minification fails
  }
}

// Fix and optimize index.html files
async function processHtmlFiles() {
  // Define meta content for each language
  const metaContent = {
    en: {
      description: "UNDP's work on ocean health and sustainability initiatives globally",
      title: "Turning the Tide | Ocean Health & Sustainability | UNDP",
      ogDescription: "Discover UNDP's work on ocean health, sustainability initiatives, and how we're turning the tide for marine ecosystems around the world."
    },
    es: {
      description: "El trabajo del PNUD sobre la salud oceánica e iniciativas de sostenibilidad a nivel mundial",
      title: "Cambiando el Rumbo | Salud y Sostenibilidad Oceánica | PNUD",
      ogDescription: "Descubra el trabajo del PNUD sobre la salud de los océanos y las iniciativas de sostenibilidad para ecosistemas marinos en todo el mundo."
    },
    fr: {
      description: "Le travail du PNUD sur la santé des océans et les initiatives de durabilité à l'échelle mondiale",
      title: "Renverser la Tendance | Santé et Durabilité des Océans | PNUD",
      ogDescription: "Découvrez le travail du PNUD sur la santé des océans et les initiatives de durabilité pour les écosystèmes marins du monde entier."
    }
  };
  
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Fix all asset paths to be relative - this is critical for static sites
    indexContent = indexContent
      .replace(/src="\/assets\/([^"]+)"/g, 'src="./assets/$1"')
      .replace(/href="\/assets\/([^"]+)"/g, 'href="./assets/$1"')
      .replace(/ src="\//g, ' src="./') 
      .replace(/ href="\//g, ' href="./');

    // Add SEO meta tags for English
    indexContent = indexContent.replace('</head>', `
  <meta name="description" content="${metaContent.en.description}">
  <meta property="og:title" content="${metaContent.en.title}">
  <meta property="og:description" content="${metaContent.en.ogDescription}">
  <meta property="og:url" content="${domain}/">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${domain}/assets/cards-ocean.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metaContent.en.title}">
  <meta name="twitter:description" content="${metaContent.en.ogDescription}">
  <meta name="twitter:image" content="${domain}/assets/cards-ocean.jpg">
  <link rel="canonical" href="${domain}/">
  <link rel="alternate" hreflang="en" href="${domain}/">
  <link rel="alternate" hreflang="es" href="${domain}/es/">
  <link rel="alternate" hreflang="fr" href="${domain}/fr/">
</head>`);
    
    // Apply final optimization and save
    const optimizedIndexContent = await optimizeHtml(indexContent);
    fs.writeFileSync(indexPath, optimizedIndexContent);
    console.log('✓ Enhanced and optimized English index.html');
    
    // Create Spanish version by replacing the entire head section
    let esHtml = optimizedIndexContent.replace(/<html lang="en"/, '<html lang="es"');
    
    // Replace the meta tags for Spanish
    esHtml = esHtml.replace(/<meta name="description".*?<\/head>/s, `
  <meta name="description" content="${metaContent.es.description}">
  <meta property="og:title" content="${metaContent.es.title}">
  <meta property="og:description" content="${metaContent.es.ogDescription}">
  <meta property="og:url" content="${domain}/es/">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${domain}/assets/cards-ocean.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metaContent.es.title}">
  <meta name="twitter:description" content="${metaContent.es.ogDescription}">
  <meta name="twitter:image" content="${domain}/assets/cards-ocean.jpg">
  <link rel="canonical" href="${domain}/es/">
  <link rel="alternate" hreflang="en" href="${domain}/">
  <link rel="alternate" hreflang="es" href="${domain}/es/">
  <link rel="alternate" hreflang="fr" href="${domain}/fr/">
</head>`);
    
    fs.mkdirSync(esPath, { recursive: true });
    fs.writeFileSync(esIndexPath, esHtml);
    console.log('✓ Created and optimized Spanish index.html');
    
    // Create French version by replacing the entire head section
    let frHtml = optimizedIndexContent.replace(/<html lang="en"/, '<html lang="fr"');
    
    // Replace the meta tags for French
    frHtml = frHtml.replace(/<meta name="description".*?<\/head>/s, `
  <meta name="description" content="${metaContent.fr.description}">
  <meta property="og:title" content="${metaContent.fr.title}">
  <meta property="og:description" content="${metaContent.fr.ogDescription}">
  <meta property="og:url" content="${domain}/fr/">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${domain}/assets/cards-ocean.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metaContent.fr.title}">
  <meta name="twitter:description" content="${metaContent.fr.ogDescription}">
  <meta name="twitter:image" content="${domain}/assets/cards-ocean.jpg">
  <link rel="canonical" href="${domain}/fr/">
  <link rel="alternate" hreflang="en" href="${domain}/">
  <link rel="alternate" hreflang="es" href="${domain}/es/">
  <link rel="alternate" hreflang="fr" href="${domain}/fr/">
</head>`);
    
    fs.mkdirSync(frPath, { recursive: true });
    fs.writeFileSync(frIndexPath, frHtml);
    console.log('✓ Created and optimized French index.html');
  }
}

// Generate sitemap.xml
function generateSitemap() {
  // Use the same domain variable that we defined earlier to ensure consistency
  const baseUrl = domain;
  
  const routes = [
    '/', // Default English route
    '/es/', // Spanish route
    '/fr/', // French route
  ];
  
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Add each route with language alternates
  routes.forEach(route => {
    const lang = route === '/' ? 'en' : route.replace(/\//g, '');
    
    sitemap += `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>`;
    
    // Add language alternates
    sitemap += `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es/" />
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr/" />`;
    
    sitemap += `
  </url>
`;
  });

  sitemap += `</urlset>`;

  // Write sitemap to output directory
  fs.writeFileSync(path.resolve(distPath, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

// Generate robots.txt if it doesn't exist
function generateRobotsTxt() {
  // Use the same domain variable that we defined earlier to ensure consistency
  const baseUrl = domain;
  
  const robotsTxt = `User-agent: *
Allow: /

# Block access to admin or private areas if needed
# Disallow: /admin/

# Allow all image files
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.gif$
Allow: /*.webp$

Sitemap: ${baseUrl}/sitemap.xml
`;

  fs.writeFileSync(path.resolve(distPath, 'robots.txt'), robotsTxt);
  console.log('robots.txt generated successfully!');
}

// Add .nojekyll for GitHub Pages
if (process.env.BASE_URL === '/turning-the-tide/') {
  fs.writeFileSync(path.resolve(distPath, '.nojekyll'), '');
  console.log('.nojekyll file created for GitHub Pages');
}

// Main async function to run all post-build steps
async function runPostBuildTasks() {
  try {
    // Process HTML files first
    await processHtmlFiles();
    
    // Generate sitemap and robots.txt
    generateSitemap();
    generateRobotsTxt();
    
    console.log('Static site post-build processing completed successfully!');
  } catch (error) {
    console.error('Error during post-build processing:', error);
    process.exit(1);
  }
}

// Run the post-build process
runPostBuildTasks();
