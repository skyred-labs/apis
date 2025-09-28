const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Import API handlers
const addHandler = require('./api/add.js');
const testHandler = require('./api/test.js');
const usersAddHandler = require('./api/users-add.js');
const usersListHandler = require('./api/users-list.js');
const usersTestHandler = require('./api/users-test.js');
const usersSimpleHandler = require('./api/users-simple.js');

// API Routes
app.post('/api/add', (req, res) => {
  addHandler.default(req, res);
});

app.get('/api/test', (req, res) => {
  testHandler.default(req, res);
});

app.post('/api/users-add', (req, res) => {
  usersAddHandler.default(req, res);
});

app.get('/api/users-list', (req, res) => {
  usersListHandler.default(req, res);
});

app.get('/api/users-test', (req, res) => {
  usersTestHandler.default(req, res);
});

// Simple users API (without database)
app.all('/api/users-simple', (req, res) => {
  usersSimpleHandler.default(req, res);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Simple Calculator & User Management API',
    version: '1.0.0',
    endpoints: {
      'POST /api/add': 'Calculator - Tính tổng 2 số',
      'GET /api/test': 'Test API',
      'POST /api/users-add': 'Add user (cần database)',
      'GET /api/users-list': 'Get users list (cần database)',
      'GET /api/users-test': 'Users test API',
      'ALL /api/users-simple': 'Simple users API (không cần database)',
      'GET /health': 'Health check'
    },
    staticFiles: {
      'anh1.png': '/anh1.png',
      'question1.png': '/question1.png'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 API docs: http://localhost:${PORT}/`);
});

module.exports = app;
