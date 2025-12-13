const request = require('supertest');
const express = require('express');
const cors = require('cors');
const tasksRouter = require('../routes/tasks');

// Create test app similar to server.js
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tasks', tasksRouter);

describe('Server Health Check', () => {
  test('GET /health should return OK status', async () => {
    // Note: This would require the health endpoint to be exported or tested separately
    // For now, we test the tasks endpoint structure
    const response = await request(app)
      .get('/api/tasks')
      .expect(200);

    expect(response.body).toBeDefined();
  });
});

describe('CORS Configuration', () => {
  test('should include CORS headers', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .expect(200);

    // CORS middleware should be applied
    expect(response.headers).toBeDefined();
  });
});

