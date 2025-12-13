const request = require('supertest');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const tasksRouter = require('../tasks');

// Create a test app
const app = express();
app.use(express.json());
app.use('/api/tasks', tasksRouter);

describe('Tasks API', () => {
  // Note: These tests interact with the actual tasks.json file
  // In a production environment, you would use a test database or mock the file system
  // For this implementation, we test the API endpoints structure and validation

  describe('GET /api/tasks', () => {
    test('should return an array', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return valid JSON structure', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toBeDefined();
    });
  });

  describe('POST /api/tasks', () => {
    test('should create a new task with valid data', async () => {
      const newTask = {
        title: 'Test Task',
        status: 'todo',
        dueDate: '2024-12-31',
        reminder: false
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body.title).toBe('Test Task');
      expect(response.body.status).toBe('todo');
      
      // Cleanup: delete the created task
      if (response.body.id) {
        await request(app).delete(`/api/tasks/${response.body.id}`);
      }
    });

    test('should return 400 if title is missing', async () => {
      const invalidTask = {
        status: 'todo'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('title');
    });

    test('should return 400 if title is empty', async () => {
      const invalidTask = {
        title: '   ',
        status: 'todo'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should use default status if not provided', async () => {
      const newTask = {
        title: 'Task without status'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body.status).toBe('todo');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    test('should return 404 if task not found', async () => {
      const nonExistentId = 'non-existent-id';
      const updates = {
        title: 'Updated Title'
      };

      const response = await request(app)
        .put(`/api/tasks/${nonExistentId}`)
        .send(updates)
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('not found');
    });

    test('should update task with valid data', async () => {
      // First create a task
      const newTask = {
        title: 'Original Title',
        status: 'todo'
      };

      const createResponse = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      const taskId = createResponse.body.id;

      // Then update it
      const updates = {
        title: 'Updated Title',
        status: 'in-progress'
      };

      const updateResponse = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send(updates)
        .expect(200);

      expect(updateResponse.body.title).toBe('Updated Title');
      expect(updateResponse.body.status).toBe('in-progress');
      
      // Cleanup
      await request(app).delete(`/api/tasks/${taskId}`);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    test('should return 404 if task not found', async () => {
      const nonExistentId = 'non-existent-id';

      const response = await request(app)
        .delete(`/api/tasks/${nonExistentId}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    test('should delete task successfully', async () => {
      // First create a task
      const newTask = {
        title: 'Task to Delete',
        status: 'todo'
      };

      const createResponse = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      const taskId = createResponse.body.id;

      // Then delete it
      const deleteResponse = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .expect(200);

      expect(deleteResponse.body).toHaveProperty('message');
      expect(deleteResponse.body.message).toContain('deleted');
    });
  });
});

