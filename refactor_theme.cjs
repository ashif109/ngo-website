const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Exact class replacements
  { regex: /bg-\[\#003366\]/g, replacement: 'bg-primary' },
  { regex: /text-\[\#003366\]/g, replacement: 'text-primary' },
  { regex: /border-\[\#003366\]/g, replacement: 'border-primary' },
  { regex: /from-\[\#003366\]/g, replacement: 'from-primary-dark' }, // Using primary-dark for gradients
  { regex: /to-\[\#003366\]/g, replacement: 'to-primary' },
  { regex: /via-\[\#003366\]/g, replacement: 'via-primary' },

  { regex: /bg-\[\#0055a5\]/g, replacement: 'bg-primary-light' },
  { regex: /text-\[\#0055a5\]/g, replacement: 'text-primary-light' },
  { regex: /border-\[\#0055a5\]/g, replacement: 'border-primary-light' },
  { regex: /to-\[\#0055a5\]/g, replacement: 'to-primary-light' },

  { regex: /bg-\[\#001f3f\]/g, replacement: 'bg-primary-dark' },
  { regex: /to-\[\#001f3f\]/g, replacement: 'to-primary-dark' },

  { regex: /bg-\[\#006400\]/g, replacement: 'bg-primary' },
  
  // Tailwind specific colors that were used previously
  { regex: /bg-orange-500/g, replacement: 'bg-secondary' },
  { regex: /bg-orange-600/g, replacement: 'bg-accent' },
  { regex: /text-orange-500/g, replacement: 'text-secondary' },
  { regex: /text-orange-600/g, replacement: 'text-accent' },
  { regex: /border-orange-500/g, replacement: 'border-secondary' },
  { regex: /from-orange-500/g, replacement: 'from-secondary' },

  { regex: /text-blue-300/g, replacement: 'text-secondary-light' },
  { regex: /text-blue-500/g, replacement: 'text-secondary' },
  { regex: /border-blue-500\/30/g, replacement: 'border-secondary/30' },
  { regex: /border-blue-500/g, replacement: 'border-secondary' },
  
  { regex: /bg-blue-50/g, replacement: 'bg-surface' },
  { regex: /bg-blue-600/g, replacement: 'bg-primary-light' },

  { regex: /bg-gray-50/g, replacement: 'bg-background' },
  { regex: /bg-gray-100/g, replacement: 'bg-surface' },
  { regex: /border-gray-100/g, replacement: 'border-border-main' },
  { regex: /border-gray-200/g, replacement: 'border-border-main' },
  { regex: /border-gray-300/g, replacement: 'border-border-main' },
  { regex: /text-gray-900/g, replacement: 'text-text-main' },
  { regex: /text-gray-800/g, replacement: 'text-text-main' },
  { regex: /text-gray-700/g, replacement: 'text-text-muted' },
  { regex: /text-gray-600/g, replacement: 'text-text-muted' },
  { regex: /text-gray-500/g, replacement: 'text-text-muted' },

  { regex: /bg-\[\#f8f9fa\]/g, replacement: 'bg-background' },

  // Buttons enhancements - replacing arbitrary transition and hover with global tokens where possible
  // We'll catch some common patterns to add golden-glow
  { regex: /hover:-translate-y-1/g, replacement: 'hover-lift' },
  
  // Generic hex strings for inline styles or other uses just in case
  { regex: /#003366/g, replacement: '#7A1F1E' },
  { regex: /#0055a5/g, replacement: '#9D2928' },
  { regex: /#001f3f/g, replacement: '#5C1615' },
  { regex: /#006400/g, replacement: '#7A1F1E' },
  
  // Newly discovered hex codes
  { regex: /bg-\[\#002147\]/g, replacement: 'bg-primary-dark' },
  { regex: /bg-\[\#004a8f\]/g, replacement: 'bg-primary' },
  { regex: /bg-\[\#fffdfa\]/g, replacement: 'bg-background' },
  { regex: /border-\[\#eee6d8\]/g, replacement: 'border-border-main' },
  { regex: /bg-\[\#1a1a1a\]/g, replacement: 'bg-text-main' },
  { regex: /bg-\[\#004d00\]/g, replacement: 'bg-primary-dark' },
  { regex: /bg-\[\#f2fcf2\]/g, replacement: 'bg-surface' },
  
  // Tailwind blue classes
  { regex: /bg-blue-950/g, replacement: 'bg-primary-dark' },
  { regex: /bg-blue-900/g, replacement: 'bg-primary' },
  { regex: /bg-blue-800/g, replacement: 'bg-primary-dark' },
  { regex: /border-blue-700/g, replacement: 'border-primary' },
  { regex: /shadow-blue-500/g, replacement: 'shadow-secondary' },
  { regex: /text-blue-400/g, replacement: 'text-secondary' },
  { regex: /text-blue-200/g, replacement: 'text-secondary-light' },
  { regex: /text-blue-100/g, replacement: 'text-white' },
  
  { regex: /bg-blue-100/g, replacement: 'bg-surface' },
  { regex: /text-blue-900/g, replacement: 'text-primary' },
  { regex: /hover:bg-blue-700/g, replacement: 'hover:bg-primary-dark' },
  
  { regex: /border-blue-900\/60/g, replacement: 'border-secondary/60' },
  { regex: /border-green-700/g, replacement: 'border-secondary' },
  { regex: /text-\[\#7A1F1E\]/g, replacement: 'text-primary' }, // Fix manual hardcoded primary
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

console.log('Starting theme refactor...');
processDirectory(srcDir);
console.log('Theme refactor complete.');
