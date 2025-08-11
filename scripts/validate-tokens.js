#!/usr/bin/env node
/**
 * Token Validation Script for AA-1205 Phase 1
 * 
 * Validates alignment between design-tokens.tokens.json and main.css @theme directive
 * to prevent token drift and ensure consistency across the design system.
 * 
 * Usage: node scripts/validate-tokens.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const TOKENS_FILE = path.join(__dirname, '../docs/tokens/design-tokens.tokens.json');
const MAIN_CSS_FILE = path.join(__dirname, '../src/assets/main.css');

class TokenValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.tokens = null;
    this.cssContent = null;
  }

  /**
   * Load and parse design tokens
   */
  loadTokens() {
    try {
      const tokensContent = fs.readFileSync(TOKENS_FILE, 'utf-8');
      this.tokens = JSON.parse(tokensContent);
      console.log('✅ Loaded design tokens successfully');
    } catch (error) {
      this.errors.push(`Failed to load design tokens: ${error.message}`);
    }
  }

  /**
   * Load main.css content
   */
  loadCSS() {
    try {
      this.cssContent = fs.readFileSync(MAIN_CSS_FILE, 'utf-8');
      console.log('✅ Loaded main.css successfully');
    } catch (error) {
      this.errors.push(`Failed to load main.css: ${error.message}`);
    }
  }

  /**
   * Validate font family consistency
   */
  validateFontFamilies() {
    console.log('\n🔍 Validating Font Family Consistency...');
    
    // Check that all typography tokens use Poppins
    const typographyTokens = this.tokens.font?.heading || {};
    const bodyTokens = this.tokens.font?.body || {};
    
    // Get all typography token font families
    const allFontFamilies = new Set();
    
    Object.values(typographyTokens).forEach(token => {
      if (token.value?.fontFamily) {
        allFontFamilies.add(token.value.fontFamily);
      }
    });
    
    Object.values(bodyTokens).forEach(token => {
      if (token.value?.fontFamily) {
        allFontFamilies.add(token.value.fontFamily);
      }
    });

    // Validate single font family standard
    if (allFontFamilies.size > 1) {
      this.errors.push(`Multiple font families found in tokens: ${Array.from(allFontFamilies).join(', ')}`);
    } else if (allFontFamilies.has('Poppins')) {
      console.log('✅ All typography tokens use Poppins consistently');
    } else {
      this.warnings.push(`Expected Poppins, found: ${Array.from(allFontFamilies).join(', ')}`);
    }

    // Check CSS @theme font family (should find Poppins in @theme directive)
    const themeSection = this.cssContent.match(/@theme\s*{([^}]+)}/s);
    if (themeSection) {
      const fontSansMatch = themeSection[1].match(/--font-sans:\s*"([^"]+)"/);
      if (fontSansMatch && fontSansMatch[1] === 'Poppins') {
        console.log('✅ CSS @theme uses Poppins as default font');
      } else {
        this.errors.push(`CSS @theme --font-sans should be Poppins, found: ${fontSansMatch ? fontSansMatch[1] : 'not found'}`);
      }
    } else {
      this.errors.push('@theme directive not found');
    }

    // Check brius-theme uses Inter (theme-specific font)
    const briusThemeMatch = this.cssContent.match(/\.brius-theme\s*{[^}]*--font-sans:\s*"([^"]+)"/s);
    if (briusThemeMatch && briusThemeMatch[1] === 'Inter') {
      console.log('✅ .brius-theme uses Inter (theme-specific font)');
    } else {
      this.errors.push(`.brius-theme should use Inter, found: ${briusThemeMatch ? briusThemeMatch[1] : 'not found'}`);
    }
  }

  /**
   * Validate typography scale alignment
   */
  validateTypographyScale() {
    console.log('\n🔍 Validating Typography Scale Alignment...');
    
    const expectedLineHeights = {
      'h1': 40,    // 32px font -> 40px line-height
      'h2': 28.8,  // 24px font -> 28.8px line-height  
      'h3': 22,    // 20px font -> 22px line-height
      'h4': 16.8,  // 16px font -> 16.8px line-height
      'h5': 14.7,  // 14px font -> 14.7px line-height
      'h6': 12.6   // 12px font -> 12.6px line-height
    };

    // Extract line-height values from CSS
    const lineHeightRegex = /--line-height-(\w+):\s*([\d.]+)rem;\s*\/\*\s*([\d.]+)px/g;
    const cssLineHeights = {};
    let match;
    
    while ((match = lineHeightRegex.exec(this.cssContent)) !== null) {
      const [, name, remValue, pxValue] = match;
      cssLineHeights[name] = parseFloat(pxValue);
    }

    // Validate h4 and h5 specifically (the ones we fixed)
    if (cssLineHeights.base === 16.8) {
      console.log('✅ h4 line-height correctly set to 16.8px');
    } else {
      this.errors.push(`h4 line-height should be 16.8px, found: ${cssLineHeights.base}px`);
    }

    if (cssLineHeights.sm === 14.7) {
      console.log('✅ h5 line-height correctly set to 14.7px');
    } else {
      this.errors.push(`h5 line-height should be 14.7px, found: ${cssLineHeights.sm}px`);
    }

    // Validate other line heights
    const mappings = {
      'xs': 12.6,   // h6
      'lg': 22,     // h3
      'xl': 28.8,   // h2
      '2xl': 40     // h1
    };

    Object.entries(mappings).forEach(([size, expectedPx]) => {
      if (cssLineHeights[size] === expectedPx) {
        console.log(`✅ ${size} line-height correctly set to ${expectedPx}px`);
      } else {
        this.warnings.push(`${size} line-height expected ${expectedPx}px, found: ${cssLineHeights[size]}px`);
      }
    });
  }

  /**
   * Validate base color palette completeness
   */
  validateBaseColors() {
    console.log('\n🔍 Validating Base Color Palette Completeness...');
    
    const baseTokens = this.tokens['base-tokens']?.color || {};
    const expectedPalettes = [
      'neutral', 'etus-green', 'green', 'yellow', 'red', 
      'purple', 'sky', 'brius-blue', 'evolution-green'
    ];

    let totalColorsFound = 0;
    
    expectedPalettes.forEach(palette => {
      const paletteData = baseTokens[palette];
      if (paletteData) {
        const shadeCount = Object.keys(paletteData).length;
        totalColorsFound += shadeCount;
        console.log(`✅ ${palette} palette: ${shadeCount} shades`);
        
        // Validate each shade has hex value
        Object.entries(paletteData).forEach(([shade, data]) => {
          if (!data.value || !data.value.match(/^#[0-9a-fA-F]{8}$/)) {
            this.warnings.push(`${palette}.${shade} has invalid hex value: ${data.value}`);
          }
        });
      } else {
        this.errors.push(`Missing ${palette} color palette in base tokens`);
      }
    });

    console.log(`✅ Total base colors found: ${totalColorsFound}`);

    // Check if colors exist in CSS @theme
    const themeMatch = this.cssContent.match(/@theme\s*{([^}]+)}/s);
    if (themeMatch) {
      const themeContent = themeMatch[1];
      const colorVarCount = (themeContent.match(/--color-/g) || []).length;
      
      if (colorVarCount >= totalColorsFound) {
        console.log(`✅ CSS @theme contains ${colorVarCount} color variables`);
      } else {
        this.warnings.push(`CSS @theme has fewer colors (${colorVarCount}) than base tokens (${totalColorsFound})`);
      }
    } else {
      this.errors.push('@theme directive not found in CSS');
    }
  }

  /**
   * Validate spacing scale alignment
   */
  validateSpacingScale() {
    console.log('\n🔍 Validating Spacing Scale Alignment...');
    
    const baseSpacing = this.tokens['base-tokens']?.spacing || {};
    const spacingValues = Object.values(baseSpacing).map(token => token.value);
    
    console.log(`✅ Found ${spacingValues.length} spacing tokens in base tokens`);
    
    // Check for expected spacing values
    const expectedSpacing = [0, 4, 8, 12, 16, 20, 24, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240];
    
    const missingSpacing = expectedSpacing.filter(val => !spacingValues.includes(val));
    if (missingSpacing.length === 0) {
      console.log('✅ All expected spacing values present in tokens');
    } else {
      this.warnings.push(`Missing spacing values: ${missingSpacing.join(', ')}`);
    }

    // Check CSS spacing variables
    const spacingRegex = /--spacing-\w+:\s*(\d+)px/g;
    const cssSpacing = [];
    let match;
    
    while ((match = spacingRegex.exec(this.cssContent)) !== null) {
      cssSpacing.push(parseInt(match[1]));
    }
    
    console.log(`✅ Found ${cssSpacing.length} spacing variables in CSS`);
  }

  /**
   * Run all validations
   */
  async validate() {
    console.log('🚀 Starting Token Validation for AA-1205 Phase 1...\n');
    
    this.loadTokens();
    this.loadCSS();
    
    if (this.errors.length > 0) {
      console.log('❌ Failed to load required files. Aborting validation.');
      return false;
    }

    this.validateFontFamilies();
    this.validateTypographyScale();
    this.validateBaseColors();
    this.validateSpacingScale();

    // Report results
    console.log('\n📊 Validation Results:');
    console.log('='.repeat(50));
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('🎉 ALL VALIDATIONS PASSED! Token alignment is perfect.');
      return true;
    }

    if (this.errors.length > 0) {
      console.log(`❌ ${this.errors.length} Critical Errors Found:`);
      this.errors.forEach((error, i) => {
        console.log(`${i + 1}. ${error}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log(`⚠️ ${this.warnings.length} Warnings Found:`);
      this.warnings.forEach((warning, i) => {
        console.log(`${i + 1}. ${warning}`);
      });
    }

    return this.errors.length === 0;
  }
}

// Run validation if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new TokenValidator();
  validator.validate().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

export default TokenValidator;