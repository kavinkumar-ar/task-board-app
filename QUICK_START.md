# Quick Start Guide

## Step-by-Step Instructions to Run the Application

### Step 1: Install Backend Dependencies

Open a terminal/command prompt and run:

```bash
cd task-board-app/backend
npm install
```

This will install:
- express
- cors
- uuid

### Step 2: Start the Backend Server

In the same terminal, run:

```bash
npm start
```

You should see:
```
Server is running on http://localhost:3001
```

**Keep this terminal window open!** The backend server needs to keep running.

### Step 3: Install Frontend Dependencies

Open a **NEW** terminal/command prompt window and run:

```bash
cd task-board-app/frontend
npm install
```

This will install:
- react
- react-dom
- react-scripts
- axios
- date-fns

### Step 4: Start the Frontend Application

In the frontend terminal, run:

```bash
npm start
```

The React development server will start and automatically open your browser at `http://localhost:3000`

## Summary

You need **TWO terminal windows** running:

1. **Terminal 1 (Backend)**: 
   - Location: `task-board-app/backend`
   - Command: `npm start`
   - Running on: `http://localhost:3001`

2. **Terminal 2 (Frontend)**:
   - Location: `task-board-app/frontend`
   - Command: `npm start`
   - Running on: `http://localhost:3000`

## Troubleshooting

### Port Already in Use
If you get an error that port 3000 or 3001 is already in use:
- Close the application using that port, or
- Change the port in the respective configuration files

### Backend Not Starting
- Make sure you're in the `backend` directory
- Verify `node_modules` folder exists (run `npm install` again if needed)

### Frontend Not Connecting to Backend
- Make sure the backend server is running first
- Check that backend is on port 3001
- Verify no firewall is blocking the connection

## First Time Setup (One-Time Only)

If this is your first time running the app:

1. Make sure Node.js is installed (version 14 or higher)
   - Check by running: `node --version`
   - Download from: https://nodejs.org/

2. Install all dependencies (both backend and frontend)

3. Start both servers as described above

## Using the Application

Once both servers are running:

1. Open your browser to `http://localhost:3000`
2. You'll see the Task Board interface
3. Create a new task using the form at the top
4. Tasks will appear in the "To Do" column
5. Use the status buttons to move tasks between columns
6. Click "Edit" to modify task details
7. Click "Delete" to remove tasks

Enjoy your Task Board application! 🎉

