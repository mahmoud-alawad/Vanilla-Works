#!/bin/bash

################################################################################
# fb Global Installation Script
# Downloads fb from GitHub and installs it globally
################################################################################

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
GITHUB_URL="https://github.com/mahmoud-alawad/Vanilla-Works/raw/refs/heads/master/fb-1.0.0.zip" #TODO
INSTALL_DIR="$HOME"
BIN_DIR="/usr/local/bin"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}fb Global Installation${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 1: Check requirements
echo -e "${YELLOW}[1/5]${NC} Checking requirements..."

if ! command -v curl &> /dev/null; then
    echo -e "${RED}✗ curl is required but not installed${NC}"
    exit 1
fi

if ! command -v unzip &> /dev/null; then
    echo -e "${RED}✗ unzip is required but not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All requirements met${NC}"

# Step 2: Download ZIP
echo -e "${YELLOW}[2/5]${NC} Downloading fb from GitHub..."
TEMP_ZIP=$(mktemp)
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_ZIP $TEMP_DIR" EXIT

if ! curl -L -f -s -o "$TEMP_ZIP" "$GITHUB_URL"; then
    echo -e "${RED}✗ Failed to download from $GITHUB_URL${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Downloaded successfully ($(du -h "$TEMP_ZIP" | cut -f1))${NC}"

# Step 3: Extract ZIP
echo -e "${YELLOW}[3/5]${NC} Extracting archive..."
if ! unzip -q "$TEMP_ZIP" -d "$TEMP_DIR" 2>/dev/null; then
    echo -e "${RED}✗ Failed to extract archive${NC}"
    exit 1
fi

# Verify extracted structure
if [[ ! -d "$TEMP_DIR/fb-1.0.0" ]]; then
    echo -e "${RED}✗ Unexpected directory structure in archive${NC}"
    exit 1
fi

# Step 4: Move to installation directory
echo -e "${YELLOW}[4/5]${NC} Installing files..."


# Copy contents of fb-1.0.0 to .fb directory
if ! cp -r "$TEMP_DIR/fb-1.0.0"/* "$INSTALL_DIR/"; then
    echo -e "${RED}✗ Failed to copy files to $INSTALL_DIR${NC}"
    exit 1
fi

if ! cp -r "$TEMP_DIR/fb-1.0.0"/.* "$INSTALL_DIR/"; then
    echo -e "${RED}✗ Failed to copy files to $INSTALL_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Installed to: $INSTALL_DIR${NC}"

# Make fb.sh executable
chmod +x "$INSTALL_DIR/.fb/fb.sh"

# Step 5: Create global symlink
echo -e "${YELLOW}[5/5]${NC} Creating global symlink..."

# Check if we need sudo
if [[ ! -w "$BIN_DIR" ]]; then
    echo -e "${YELLOW}⚠️  Need sudo to create symlink in $BIN_DIR${NC}"
    sudo ln -sf "$INSTALL_DIR/.fb/fb.sh" "$BIN_DIR/fb" || {
        echo -e "${RED}✗ Failed to create global symlink${NC}"
        exit 1
    }
else
    ln -sf "$INSTALL_DIR/.fb/fb.sh" "$BIN_DIR/fb" || {
        echo -e "${RED}✗ Failed to create global symlink${NC}"
        exit 1
    }
fi

echo -e "${GREEN}✓ Symlink created: $BIN_DIR/fb${NC}"

# Final summary
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Installation complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}Installation directory:${NC} $INSTALL_DIR"
echo -e "${BLUE}Global command:${NC} fb"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. cd $INSTALL_DIR"
echo "  2. fb init"
echo "  3. fb start"
echo ""
