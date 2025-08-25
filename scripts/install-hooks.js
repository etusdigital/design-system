#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function installGitHooks() {
  const gitHooksDir = path.join(process.cwd(), ".git", "hooks");
  const sourceHooksDir = path.join(process.cwd(), ".githooks");

  if (!fs.existsSync(path.join(process.cwd(), ".git"))) {
    console.log("⚠️  Not a Git repository, skipping hooks installation");
    return;
  }

  if (!fs.existsSync(sourceHooksDir)) {
    console.log(
      "⚠️  .githooks directory not found, skipping hooks installation"
    );
    return;
  }

  console.log("🔧 Installing Git hooks...");

  const hooks = fs.readdirSync(sourceHooksDir);

  hooks.forEach((hook) => {
    const sourcePath = path.join(sourceHooksDir, hook);
    const targetPath = path.join(gitHooksDir, hook);

    try {
      fs.copyFileSync(sourcePath, targetPath);

      if (process.platform !== "win32") fs.chmodSync(targetPath, "755");

      console.log(`✅  Installed: ${hook}`);
    } catch (error) {
      console.error(`❌  Failed to install ${hook}:`, error.message);
    }
  });

  console.log("\n🎉  Git hooks installed successfully!");
  console.log(
    "📝  The pre-commit hook will now run automatically before each commit"
  );
}

if (require.main === module) installGitHooks();

module.exports = { installGitHooks };
