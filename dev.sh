#!/bin/bash

# dev.sh - Spins up both the FastAPI backend and the React frontend for Zoé Pulse

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Starting Zoé Pulse Development Servers ${NC}"
echo -e "${BLUE}=========================================${NC}"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- Start Backend ---
echo -e "\n${YELLOW}[1/2] Starting FastAPI Backend on port 8000...${NC}"
cd "$SCRIPT_DIR/backend"

# Check if virtual environment exists, if not create it
if [ ! -d "$SCRIPT_DIR/.venv" ]; then
    echo -e "${YELLOW}Virtual environment not found. Creating one...${NC}"
    python -m venv "$SCRIPT_DIR/.venv"
fi

# Activate virtual environment
source "$SCRIPT_DIR/.venv/Scripts/activate"

# Install requirements if needed
pip install -q -r "$SCRIPT_DIR/requirements.txt" 2>/dev/null || true

# Start backend in background
python main.py &
BACKEND_PID=$!
echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"

# --- Start Frontend ---
echo -e "\n${YELLOW}[2/2] Starting React Frontend (Vite) on port 5173...${NC}"
cd "$SCRIPT_DIR/frontend"

# Install npm packages if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}node_modules not found. Running npm install...${NC}"
    npm install
fi

# Start frontend in background
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}"

# --- Summary ---
echo -e "\n${GREEN}=========================================${NC}"
echo -e "${GREEN}  Both servers are running!              ${NC}"
echo -e "${GREEN}=========================================${NC}"
echo -e "${BLUE}Frontend:${NC} http://localhost:5173"
echo -e "${BLUE}Backend: ${NC} http://localhost:8000"
echo -e "${BLUE}API Docs:${NC} http://localhost:8000/docs"
echo -e "\n${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Trap Ctrl+C to kill both processes
trap "echo -e '\n${YELLOW}Shutting down servers...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

# Wait for both processes
wait
