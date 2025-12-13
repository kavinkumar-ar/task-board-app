# Task Board Application

A modern, full-stack web application for managing tasks with status tracking, reminders, and due dates. Built with React and Express.js, featuring a kanban-style board interface for organizing tasks across different status columns.

## Features

- **Task Management**: Create, read, update, and delete tasks
- **Status Tracking**: Organize tasks into three columns (To Do, In Progress, Done)
- **Due Dates**: Set and track due dates for tasks
- **Reminders**: Mark tasks with reminder flags
- **Search**: Search tasks by title
- **Filtering**: Filter tasks by status or due date (overdue, due today, due soon, upcoming, no date)
- **Statistics Dashboard**: View summary statistics including total tasks, status counts, overdue tasks, and more
- **Responsive Design**: Modern, mobile-friendly UI with gradient styling

## Tech Stack

### Backend
- **Node.js** (v14-21)
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library

### Frontend
- **React 18** - UI library
- **React Scripts** - Build tooling
- **Axios** - HTTP client
- **date-fns** - Date utility library
- **React Testing Library** - Component testing

### Data Storage
- File-based JSON storage (`backend/data/tasks.json`)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14.0.0 to 21.0.0)
- **npm** (comes with Node.js)

To check your Node.js version:
```bash
node --version
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-board-app
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- express
- cors
- uuid
- jest (dev dependency)
- supertest (dev dependency)

### 3. Install Frontend Dependencies

Open a new terminal window:

```bash
cd frontend
npm install
```

This installs:
- react
- react-dom
- react-scripts
- axios
- date-fns

## Running the Application

The application requires two servers to run simultaneously: the backend API server and the frontend development server.

### Start Backend Server

In the `backend` directory:

```bash
npm start
```

The backend server will start on **http://localhost:3001**

You should see:
```
Server is running on http://localhost:3001
```

**Keep this terminal window open!** The backend server must remain running.

### Start Frontend Application

Open a **new terminal window** and navigate to the `frontend` directory:

```bash
cd frontend
npm start
```

The React development server will start and automatically open your browser at **http://localhost:3000**

### Summary

You need **TWO terminal windows** running:

1. **Terminal 1 (Backend)**: 
   - Location: `task-board-app/backend`
   - Command: `npm start`
   - Running on: `http://localhost:3001`

2. **Terminal 2 (Frontend)**:
   - Location: `task-board-app/frontend`
   - Command: `npm start`
   - Running on: `http://localhost:3000`

## Environment Variables

No environment variables are required. The backend server defaults to port 3001 if `PORT` is not set.

To use a custom port:
```bash
PORT=3002 npm start
```

## Testing

### Backend Tests

Run the backend test suite:

```bash
cd backend
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Frontend Tests

Run the frontend test suite:

```bash
cd frontend
npm test
```

## Project Structure

```
task-board-app/
├── backend/
│   ├── __tests__/
│   │   └── server.test.js
│   ├── data/
│   │   └── tasks.json          # Data storage file
│   ├── routes/
│   │   ├── __tests__/
│   │   │   └── tasks.test.js
│   │   └── tasks.js            # API routes
│   ├── jest.config.js
│   ├── package.json
│   └── server.js               # Express server
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── __tests__/      # Component tests
│   │   │   ├── SearchAndFilter.jsx
│   │   │   ├── StatsSummary.jsx
│   │   │   ├── StatusColumn.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   └── api.js          # API service layer
│   │   ├── utils/
│   │   │   ├── __tests__/
│   │   │   └── dateUtils.js    # Date utility functions
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── README.md
└── QUICK_START.md
```

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### GET /api/tasks
Retrieve all tasks.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Task title",
    "status": "todo",
    "dueDate": "2024-12-31",
    "reminder": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Task title",
  "status": "todo",
  "dueDate": "2024-12-31",
  "reminder": false
}
```

**Response:** Created task object (201)

#### PUT /api/tasks/:id
Update an existing task.

**Request Body:**
```json
{
  "title": "Updated title",
  "status": "in-progress",
  "dueDate": "2024-12-31",
  "reminder": true
}
```

**Response:** Updated task object (200)

#### DELETE /api/tasks/:id
Delete a task.

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

#### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Task Board API is running"
}
```

## Known Issues / Limitations

### Data Storage
- **File-based storage**: The application uses JSON file storage (`backend/data/tasks.json`) instead of a database. This is suitable for development and small-scale use but not recommended for production.
- **No data persistence guarantee**: If the `tasks.json` file is deleted or corrupted, all task data will be lost.
- **Single-file limitation**: All tasks are stored in a single JSON file, which may become slow with a large number of tasks (thousands+).

### Authentication & Authorization
- **No user authentication**: The application does not include user login or authentication features.
- **No multi-user support**: This is a single-user application. All tasks are shared and there's no user separation.

### Scalability
- **Not production-ready**: The current implementation is designed for development and learning purposes. For production use, consider:
  - Database integration (MongoDB, PostgreSQL, etc.)
  - User authentication and authorization
  - API rate limiting
  - Error logging and monitoring
  - Data backup strategies

### Partially Implemented Features
- All core features are fully implemented. The stretch features (search, filter, statistics) are complete and functional.

## AI Tools & Prompts Used

### AI Tools Used
- **Cursor (Auto/AI Assistant)** - Primary development tool used throughout the project

### Purpose of Usage
AI assistance was used for:
- Code generation for new features and components
- Debugging and error resolution
- Test case generation
- Code organization and refactoring
- Documentation assistance

### Development Approach
**Mixed approach**: AI was used for feature implementation and code generation, while core business logic and architectural decisions were made manually.

### Representative Prompts

1. **Feature Implementation**
   ```
   "Implement optional stretch features: search, filter, and statistics"
   ```
   - **Purpose**: Generate SearchAndFilter and StatsSummary components
   - **Result**: Complete implementation of search functionality, status/date filtering, and statistics dashboard

2. **Test Coverage**
   ```
   "Add test cases for backend and frontend"
   ```
   - **Purpose**: Create comprehensive test suites
   - **Result**: Test files for backend API endpoints and frontend components using Jest and React Testing Library

3. **Bug Fixes**
   ```
   "Fix compilation errors in App.jsx and StatsSummary.jsx"
   ```
   - **Purpose**: Resolve import errors
   - **Result**: Fixed incorrect imports (isOverdue, isDueSoon from dateUtils instead of date-fns)

4. **Git Workflow**
   ```
   "Create 5 meaningful git commits for GitHub submission"
   ```
   - **Purpose**: Organize commit history
   - **Result**: Created logical commit structure: setup → backend → frontend → features → tests

5. **Documentation**
   ```
   "Create comprehensive README with AI tools documentation"
   ```
   - **Purpose**: Generate complete project documentation
   - **Result**: This README file with all required sections

### How AI Assisted/Improved the Solution

- **Faster Development**: AI significantly accelerated feature implementation, allowing focus on architecture and business logic
- **Code Quality**: AI-generated code followed best practices and React patterns
- **Test Coverage**: AI helped generate comprehensive test cases covering edge cases
- **Error Resolution**: Quick identification and fixes for compilation and runtime errors
- **Consistency**: AI maintained consistent code style and patterns across components

### What Was Written Manually

- **Core Business Logic**: The task management logic in `backend/routes/tasks.js` was designed and implemented manually
- **Initial Project Structure**: Project setup, folder organization, and initial architecture decisions
- **CSS Styling**: Visual design decisions, color schemes, and responsive layout choices
- **Component Architecture**: Planning of component hierarchy and data flow
- **API Design**: Endpoint structure and request/response formats

## Troubleshooting

### Port Already in Use
If you get an error that port 3000 or 3001 is already in use:
- Close the application using that port, or
- Change the port in the respective configuration files
- For backend: Set `PORT` environment variable
- For frontend: Create `.env` file with `PORT=3002`

### Backend Not Starting
- Make sure you're in the `backend` directory
- Verify `node_modules` folder exists (run `npm install` again if needed)
- Check that Node.js version is between 14 and 21

### Frontend Not Connecting to Backend
- Make sure the backend server is running first
- Check that backend is on port 3001
- Verify no firewall is blocking the connection
- Check browser console for CORS errors

### Tests Failing
- Ensure all dependencies are installed (`npm install`)
- For backend tests: Make sure the server isn't running on the test port
- For frontend tests: Run `npm test` from the frontend directory
