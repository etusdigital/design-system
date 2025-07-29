#!/bin/bash

# Storybook Upgrade Implementation Script
# Run this script to implement the improvements step by step

set -e

echo "🚀 Starting Storybook Improvement Implementation"
echo "=============================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d ".storybook" ]; then
    print_error "Please run this script from the design system root directory"
    exit 1
fi

print_info "Current directory: $(pwd)"

# Phase 1: Install Dependencies
echo ""
echo "Phase 1: Installing Dependencies"
echo "==============================="

dependencies=(
    "@storybook/addon-essentials@^8.4.7"
    "@storybook/addon-a11y@^8.4.7" 
    "@storybook/addon-design-tokens@^8.4.7"
    "@storybook/addon-viewport@^8.4.7"
    "@storybook/addon-interactions@^8.4.7"
    "@storybook/test@^8.4.7"
    "@storybook/addon-coverage@^1.2.1"
)

for dep in "${dependencies[@]}"; do
    if npm list "$dep" &>/dev/null; then
        print_status "$dep already installed"
    else
        print_info "Installing $dep"
        npm install --save-dev "$dep"
        print_status "Installed $dep"
    fi
done

# Phase 2: Backup existing files
echo ""
echo "Phase 2: Backing up existing configuration"
echo "========================================="

backup_dir="storybook-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"

if [ -f ".storybook/main.ts" ]; then
    cp ".storybook/main.ts" "$backup_dir/"
    print_status "Backed up main.ts"
fi

if [ -f ".storybook/preview.ts" ]; then
    cp ".storybook/preview.ts" "$backup_dir/"
    print_status "Backed up preview.ts"
fi

print_info "Backup created in: $backup_dir"

# Phase 3: Verify configuration
echo ""
echo "Phase 3: Verifying Configuration"
echo "==============================="

if grep -q "@storybook/addon-essentials" .storybook/main.ts; then
    print_status "Modern addons configured"
else
    print_warning "Please update .storybook/main.ts with modern addons"
fi

if grep -q "storySort" .storybook/preview.ts; then
    print_status "Story organization configured"
else
    print_warning "Please update .storybook/preview.ts with story organization"
fi

# Phase 4: Generate missing stories
echo ""
echo "Phase 4: Component Analysis"
echo "=========================="

component_count=$(find src/components -name "B*.vue" | wc -l)
story_count=$(find src/components -name "*.stories.ts" | wc -l)

print_info "Found $component_count components"
print_info "Found $story_count story files"

if [ "$component_count" -ne "$story_count" ]; then
    print_warning "Some components are missing story files"
    
    # Find components without stories
    echo ""
    echo "Components missing stories:"
    for vue_file in src/components/*/B*.vue; do
        component_dir=$(dirname "$vue_file")
        component_name=$(basename "$vue_file" .vue)
        story_file="$component_dir/$component_name.stories.ts"
        
        if [ ! -f "$story_file" ]; then
            echo "  - $component_name"
        fi
    done
fi

# Phase 5: Quality checks
echo ""
echo "Phase 5: Quality Checks"
echo "======================"

# Check for Portuguese documentation
portuguese_count=$(grep -r "description.*:" src/components --include="*.stories.ts" | grep -E "(será|será|pode|deve|para)" | wc -l)
if [ "$portuguese_count" -gt 0 ]; then
    print_warning "Found $portuguese_count potential Portuguese descriptions in stories"
fi

# Check for large embedded data
large_data_files=$(find src/components -name "*.stories.ts" -exec sh -c 'wc -l < "$1"' _ {} \; | awk '$1 > 200 {print}' | wc -l)
if [ "$large_data_files" -gt 0 ]; then
    print_warning "Found $large_data_files story files with >200 lines (possibly containing large mock data)"
fi

# Phase 6: Setup validation
echo ""
echo "Phase 6: Setup Validation"
echo "========================"

# Try to build Storybook
print_info "Testing Storybook build..."
if npm run build-storybook --silent; then
    print_status "Storybook builds successfully"
else
    print_error "Storybook build failed - please check configuration"
fi

# Phase 7: Generate improvement commands
echo ""
echo "Phase 7: Next Steps"
echo "=================="

echo "Run these commands to continue the improvement process:"
echo ""
echo "1. Generate stories for missing components:"
echo "   node scripts/generate-story.js BComponentName"
echo ""
echo "2. Start Storybook development server:"
echo "   npm run storybook"
echo ""
echo "3. Test the new features:"
echo "   - Check the improved story organization"
echo "   - Test accessibility addon"
echo "   - Try different viewports"
echo "   - Explore design tokens"
echo ""
echo "4. Priority components to migrate first:"
echo "   - BButton (example completed)"
echo "   - BInput (complex form component)"
echo "   - BCard (currently minimal)"
echo "   - BTable (needs simplification)"
echo "   - BSelect (form control)"

# Phase 8: Create helpful aliases
echo ""
echo "Phase 8: Creating Helpful Scripts"
echo "================================"

# Add scripts to package.json if they don't exist
if ! grep -q "storybook:generate" package.json; then
    print_info "Adding helper scripts to package.json"
    
    # Note: This is a simplified version - in practice you'd want to use a JSON parser
    echo ""
    echo "Add these scripts to your package.json:"
    echo '"storybook:generate": "node scripts/generate-story.js",'
    echo '"storybook:audit": "npm run build-storybook && echo Audit complete",'
    echo '"storybook:test": "test-storybook"'
fi

echo ""
print_status "Storybook improvement setup complete!"
print_info "Check the generated files:"
print_info "  - STORYBOOK_IMPROVEMENT_PLAN.md (detailed implementation guide)"
print_info "  - scripts/generate-story.js (story generation tool)"
print_info "  - src/utils/test-utils.ts (testing utilities)"
print_info "  - BButton.stories.improved.ts (example implementation)"

echo ""
print_info "Backup created in: $backup_dir"
echo ""
echo "🎉 Ready to start implementing the improvements!"
echo "   Follow the phases in STORYBOOK_IMPROVEMENT_PLAN.md"