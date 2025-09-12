# Setup Instructions

## NPM Deployment Setup

For automatic npm deployment to work, you need to configure the NPM token:

### 1. Create NPM Token

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Navigate to **Account Settings** → **Access Tokens**
3. Click **Generate New Token**
4. Select **Automation** as type (for CI/CD)
5. Copy the generated token

### 2. Add Token to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste the token you copied from NPM

### 3. Update package.json

Edit the `package.json` with your information:

```json
{
  "name": "your-package-name", // Unique name on NPM
  "author": "Your Name <your@email.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username/your-repo.git"
  },
  "homepage": "https://your-username.github.io/your-repo/"
}
```

## How to Deploy

### Automatic Deploy (Recommended)

1. **For manual release:**
   - Go to **Actions** on GitHub
   - Run the **CI/CD** workflow
   - Choose version type: `patch`, `minor` or `major`

2. **For tag-based release:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

### Manual Local Deploy

```bash
# Build the library
yarn build

# Publish to NPM
npm publish
```

## Versioning Structure

- `patch` (1.0.0 → 1.0.1): Bug fixes
- `minor` (1.0.0 → 1.1.0): New features
- `major` (1.0.0 → 2.0.0): Breaking changes

## Verify Deploy

After deployment, you can check:
- **NPM**: https://www.npmjs.com/package/your-package-name
- **Storybook**: https://your-username.github.io/your-repo/