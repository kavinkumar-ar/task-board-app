const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

// Helper function to read tasks from file
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

// Helper function to write tasks to file
async function writeTasks(tasks) {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

// GET /api/tasks - Retrieve all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// POST /api/tasks - Create new task
router.post('/', async (req, res) => {
  try {
    const { title, status = 'todo', dueDate, reminder = false } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const tasks = await readTasks();
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      status,
      dueDate: dueDate || null,
      reminder: Boolean(reminder),
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasks(tasks);
    
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, dueDate, reminder } = req.body;

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task fields if provided
    if (title !== undefined) {
      tasks[taskIndex].title = title.trim();
    }
    if (status !== undefined) {
      tasks[taskIndex].status = status;
    }
    if (dueDate !== undefined) {
      tasks[taskIndex].dueDate = dueDate;
    }
    if (reminder !== undefined) {
      tasks[taskIndex].reminder = Boolean(reminder);
    }

    await writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await readTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);

    if (tasks.length === filteredTasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await writeTasks(filteredTasks);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;

