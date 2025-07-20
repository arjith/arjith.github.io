#!/bin/bash

# Arjith's Personal Website Setup Script
# This script helps set up your personal website with proper configurations

echo "🚀 Setting up Arjith's Personal Website..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    print_error "index.html not found. Please run this script from the website directory."
    exit 1
fi

print_status "Found index.html - we're in the right directory"

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

print_status "Git is installed"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_warning "Not in a git repository. Initializing..."
    git init
    print_status "Git repository initialized"
fi

# Get GitHub username
echo ""
echo -e "${BLUE}Please enter your GitHub username:${NC}"
read -p "GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    print_error "GitHub username is required"
    exit 1
fi

print_status "GitHub username: $GITHUB_USERNAME"

# Update the JavaScript file with the correct username
if [ -f "script.js" ]; then
    ESCAPED_USERNAME=$(printf '%s\n' "$GITHUB_USERNAME" | sed 's/[\/&]/\\&/g')
    sed -i.bak "s/const GITHUB_USERNAME = 'arjith'/const GITHUB_USERNAME = '$ESCAPED_USERNAME'/" script.js
    rm -f script.js.bak
    print_status "Updated GitHub username in script.js"
fi

# Update social links in HTML
echo ""
echo -e "${BLUE}Social Media Setup (optional - press Enter to skip):${NC}"

echo -n "LinkedIn username (just the username part): "
read LINKEDIN_USERNAME

echo -n "Twitter username (just the username part): "
read TWITTER_USERNAME

# Update HTML with social links
if [ ! -z "$LINKEDIN_USERNAME" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|https://linkedin.com/in/arjith-retna-srikanth|https://linkedin.com/in/$LINKEDIN_USERNAME|g" index.html
    else
        # Linux
        sed -i "s|https://linkedin.com/in/arjith-retna-srikanth|https://linkedin.com/in/$LINKEDIN_USERNAME|g" index.html
    fi
    print_status "Updated LinkedIn URL"
fi

if [ ! -z "$TWITTER_USERNAME" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|https://twitter.com/arjith|https://twitter.com/$TWITTER_USERNAME|g" index.html
    else
        # Linux
        sed -i "s|https://twitter.com/arjith|https://twitter.com/$TWITTER_USERNAME|g" index.html
    fi
    print_status "Updated Twitter URL"
fi

# Update GitHub links
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|https://github.com/arjith|https://github.com/$GITHUB_USERNAME|g" index.html
    sed -i '' "s|https://arjith.github.io|https://$GITHUB_USERNAME.github.io|g" robots.txt
else
    # Linux
    sed -i "s|https://github.com/arjith|https://github.com/$GITHUB_USERNAME|g" index.html
    sed -i "s|https://arjith.github.io|https://$GITHUB_USERNAME.github.io|g" robots.txt
fi

print_status "Updated GitHub URLs"

# Check if this is the correct repository name
REPO_NAME=$(basename $(git rev-parse --show-toplevel 2>/dev/null) 2>/dev/null)
EXPECTED_REPO_NAME="$GITHUB_USERNAME.github.io"

if [ "$REPO_NAME" != "$EXPECTED_REPO_NAME" ]; then
    print_warning "Repository name is '$REPO_NAME' but should be '$EXPECTED_REPO_NAME' for GitHub Pages"
    echo "Please rename your repository to '$EXPECTED_REPO_NAME' on GitHub"
fi

# Set up git remote if not exists
REMOTE_URL="https://github.com/$GITHUB_USERNAME/$GITHUB_USERNAME.github.io.git"

if ! git remote get-url origin &> /dev/null; then
    echo ""
    echo -e "${BLUE}Setting up git remote...${NC}"
    git remote add origin $REMOTE_URL
    print_status "Added git remote: $REMOTE_URL"
else
    CURRENT_REMOTE=$(git remote get-url origin)
    if [ "$CURRENT_REMOTE" != "$REMOTE_URL" ]; then
        print_warning "Current remote: $CURRENT_REMOTE"
        print_warning "Expected remote: $REMOTE_URL"
        echo "You may want to update your remote URL"
    fi
fi

# Commit all changes
echo ""
echo -e "${BLUE}Committing changes...${NC}"

git add .
git commit -m "Initial setup: Configure personal website for $GITHUB_USERNAME" 2>/dev/null

if [ $? -eq 0 ]; then
    print_status "Changes committed"
else
    print_info "No changes to commit (possibly already committed)"
fi

# Create a .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << EOF
# macOS
.DS_Store

# Logs
*.log

# Editor files
.vscode/
.idea/

# Backup files
*.bak
*~

# Cache
.cache/

# Temporary files
tmp/
temp/
EOF
    print_status "Created .gitignore file"
fi

echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=========================================="
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Push your changes to GitHub:"
echo -e "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "2. Enable GitHub Pages:"
echo "   - Go to your repository on GitHub"
echo "   - Navigate to Settings → Pages"
echo "   - Select 'Deploy from a branch'"
echo "   - Choose 'main' branch and '/ (root)' folder"
echo "   - Click Save"
echo ""
echo "3. Your website will be available at:"
echo -e "   ${GREEN}https://$GITHUB_USERNAME.github.io${NC}"
echo ""
echo "4. It may take a few minutes for your site to be live"
echo ""
echo -e "${BLUE}Additional Setup:${NC}"
echo "- Customize your bio and information in the HTML"
echo "- Add more blog posts in blog.js"
echo "- Update colors and styling in styles.css"
echo "- Add your own profile picture"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
