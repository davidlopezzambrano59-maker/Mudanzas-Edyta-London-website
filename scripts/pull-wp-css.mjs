#!/usr/bin/env node

/**
 * WordPress CSS Puller Script
 * 
 * This script downloads CSS from the WordPress site and prefixes all selectors
 * with .wp-skin to avoid conflicts with existing styles.
 * 
 * Usage:
 * 1. Update the WP_CSS_URLS array below with the actual CSS URLs from the WP site
 * 2. Run: node scripts/pull-wp-css.mjs
 * 
 * The script will create public/css/wp-skin.css with all WP styles prefixed.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WordPress CSS URLs from https://mudanzasedyta-london.com/
// Based on typical WordPress structure and visual analysis
const WP_CSS_URLS = [
  'https://mudanzasedyta-london.com/wp-content/themes/landco/style.css',
  'https://mudanzasedyta-london.com/wp-content/themes/landco/assets/css/bootstrap.min.css',
  'https://mudanzasedyta-london.com/wp-content/themes/landco/assets/css/main.css',
  'https://mudanzasedyta-london.com/wp-content/plugins/elementor/assets/css/frontend-lite.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
];

// CSS selectors to exclude (admin, editor styles, etc.)
const EXCLUDE_PATTERNS = [
  /\.admin-/,
  /\.wp-admin/,
  /\.editor-/,
  /\.block-editor/,
  /\.gutenberg/,
  /\.wp-block-/,
  /\.customize-/,
];

async function fetchCSS(url) {
  try {
    console.log(`Fetching CSS from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.warn(`Failed to fetch ${url}:`, error.message);
    return '';
  }
}

function prefixSelectors(css) {
  // Simple CSS selector prefixing
  // This is a basic implementation - for production use postcss-prefix-selector
  const lines = css.split('\n');
  let result = '';
  let inRule = false;
  
  for (let line of lines) {
    const trimmed = line.trim();
    
    // Skip comments and empty lines
    if (trimmed.startsWith('/*') || trimmed.endsWith('*/') || !trimmed) {
      result += line + '\n';
      continue;
    }
    
    // Check if this is a selector line (not a property)
    if (!inRule && trimmed && !trimmed.includes(':') && !trimmed.startsWith('}')) {
      // This looks like a selector
      if (trimmed.endsWith('{')) {
        // Selector with opening brace
        const selector = trimmed.slice(0, -1).trim();
        if (!shouldExcludeSelector(selector)) {
          result += `.wp-skin ${selector} {\n`;
        } else {
          result += line + '\n';
        }
        inRule = true;
      } else {
        // Multi-line selector
        if (!shouldExcludeSelector(trimmed)) {
          result += `.wp-skin ${trimmed}\n`;
        } else {
          result += line + '\n';
        }
      }
    } else if (trimmed === '{') {
      result += '{\n';
      inRule = true;
    } else if (trimmed === '}') {
      result += '}\n';
      inRule = false;
    } else {
      result += line + '\n';
    }
  }
  
  return result;
}

function shouldExcludeSelector(selector) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(selector));
}

async function main() {
  console.log('🎨 WordPress CSS Puller Starting...\n');
  
  if (WP_CSS_URLS.length === 0 || WP_CSS_URLS[0].includes('example')) {
    console.log('⚠️  Please update the WP_CSS_URLS array in this script with actual CSS URLs from the WordPress site.');
    console.log('   Run this in the browser console on https://mudanzasedyta-london.com/:');
    console.log('   [...document.querySelectorAll(\'link[rel="stylesheet"]\')].map(l => l.href)');
    console.log('   Then update this script and run again.\n');
    process.exit(1);
  }
  
  let combinedCSS = `/* WordPress Skin CSS - Generated from ${WP_CSS_URLS.length} stylesheets */\n`;
  combinedCSS += `/* Generated on: ${new Date().toISOString()} */\n\n`;
  
  for (const url of WP_CSS_URLS) {
    const css = await fetchCSS(url);
    if (css) {
      combinedCSS += `/* Source: ${url} */\n`;
      combinedCSS += prefixSelectors(css);
      combinedCSS += '\n\n';
    }
  }
  
  // Ensure public/css directory exists
  const outputDir = path.join(__dirname, '..', 'public', 'css');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the combined CSS
  const outputPath = path.join(outputDir, 'wp-skin.css');
  fs.writeFileSync(outputPath, combinedCSS);
  
  console.log(`✅ WordPress CSS successfully processed and saved to: ${outputPath}`);
  console.log(`📊 Total size: ${(combinedCSS.length / 1024).toFixed(2)}KB`);
  console.log('\n🎯 Next steps:');
  console.log('1. Import the CSS in app/layout.tsx');
  console.log('2. Wrap your marketing shell with <div className="wp-skin">');
  console.log('3. Keep calculator/booking outside .wp-skin if conflicts arise');
}

main().catch(console.error);

