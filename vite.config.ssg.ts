// vite.config.ssg.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in an ES modules environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define routes for pre-rendering
const routes = [
  '/', // Default English route
  '/es/', // Spanish route
  '/fr/', // French route
];

// This configuration is used to generate static site with pre-rendering
export default defineConfig({
  plugins: [vue()],
  base: process.env.BASE_URL || (process.env.GITHUB_REPO ? `/${process.env.GITHUB_REPO.split('/')[1]}/` : '/'),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        es: path.resolve(__dirname, 'es/index.html'),
        fr: path.resolve(__dirname, 'fr/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Define SSG options separately to avoid TypeScript errors
  ssg: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      // CSS optimization options
      preload: 'media',
      inlineFonts: true,
    },
    includedRoutes: () => routes,
    onFinished() {
      generateSitemap();
    },
  }
});

// Function to generate sitemap.xml
function generateSitemap() {
  const baseUrl = process.env.BASE_URL === '/turning-the-tide/' 
    ? 'https://yourusername.github.io/turning-the-tide' 
    : 'https://your-production-domain.com';
  
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
    if (lang === 'en') {
      sitemap += `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es/" />
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr/" />`;
    } else if (lang === 'es') {
      sitemap += `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es/" />
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr/" />`;
    } else if (lang === 'fr') {
      sitemap += `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es/" />
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr/" />`;
    }
    
    sitemap += `
  </url>
`;
  });

  sitemap += `</urlset>`;

  // Write sitemap to output directory
  fs.writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}
