#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * Remove JSX/React imports and Storybook specific content from MDX
 */
function cleanMdxContent(content) {
  let cleaned = content;

  cleaned = cleaned.replace(/^import.*$/gm, "");

  cleaned = cleaned.replace(
    /<Meta[^>]*\/?>[\s\S]*?<\/Meta>|<Meta[^>]*\/>/gi,
    ""
  );

  cleaned = cleaned.replace(/### Playground[\s\S]*?(?=---|###|$)/gi, "");

  cleaned = cleaned.replace(
    /<Canvas[^>]*>[\s\S]*?<\/Canvas>|<Canvas[^>]*\/>/gi,
    ""
  );

  cleaned = cleaned.replace(
    /<Controls[^>]*\/?>[\s\S]*?<\/Controls>|<Controls[^>]*\/>/gi,
    ""
  );

  cleaned = cleaned.replace(
    /<Story[^>]*\/?>[\s\S]*?<\/Story>|<Story[^>]*\/>/gi,
    ""
  );

  cleaned = cleaned.replace(/<br\s*\/>\s*\n---/g, "");

  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, "\n\n");

  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * Recursively find all MDX files in a directory
 */
function findMdxFiles(dir) {
  const files = [];

  function searchDir(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) searchDir(itemPath);
        else if (item.endsWith(".mdx")) files.push(itemPath);
      }
    } catch (error) {
      console.error(`Error reading directory ${currentDir}:`, error.message);
    }
  }

  searchDir(dir);
  return files;
}

/**
 * Process a single MDX file
 */
function processMdxFile(filePath) {
  try {
    console.log(`Processing: ${path.relative(process.cwd(), filePath)}`);

    const content = fs.readFileSync(filePath, "utf8");
    const cleanedContent = cleanMdxContent(content);

    if (!cleanedContent.trim()) {
      console.log(`⚠️  No content left after cleaning, skipping...`);
      return false;
    }

    const fileName = path.basename(filePath, ".mdx");

    const outputDir = path.join(process.cwd(), "docs");
    const outputPath = path.join(outputDir, `${fileName}.md`);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    fs.writeFileSync(outputPath, cleanedContent);
    console.log(`✅  Generated: ${path.relative(process.cwd(), outputPath)}`);

    return true;
  } catch (error) {
    console.error(`❌  Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log("🔄  Generating MD files from component MDX files...\n");

  const componentsDir = path.join(process.cwd(), "src", "components");

  if (!fs.existsSync(componentsDir)) {
    console.error("❌  Components directory not found: src/components/");
    process.exit(1);
  }

  const mdxFiles = findMdxFiles(componentsDir);

  if (mdxFiles.length === 0) {
    console.log("❌  No MDX files found in src/components/");
    process.exit(1);
  }

  console.log(`Found ${mdxFiles.length} component MDX files:\n`);

  let processed = 0;
  let skipped = 0;

  mdxFiles.forEach((filePath) => {
    const success = processMdxFile(filePath);
    if (success) processed++;
    else skipped++;
  });

  console.log(`\n📊  Summary:`);
  console.log(`✅  Processed: ${processed} files`);
  console.log(`⚠️  Skipped: ${skipped} files`);
  console.log(`📁  Output directory: docs/`);

  if (processed > 0) console.log("\n🎉 MD files generated successfully!");
}

if (require.main === module) main();

module.exports = { cleanMdxContent, processMdxFile };