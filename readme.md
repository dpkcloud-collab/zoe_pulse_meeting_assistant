# local deployment
to run the project follow below
# 1. Make dev.sh executable (Git Bash / WSL / MSYS2)
chmod +x dev.sh

# 2. Run it
./dev.sh

# backend
cd backend
..\..\.venv\Scripts\python.exe main.py

# frontend
cd frontend
npm run dev
