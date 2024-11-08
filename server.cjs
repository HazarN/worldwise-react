// Necessary packages for serving the app with Express.js
const express = require('express');
const http = require('http');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Serve the static files from the Vite build (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));

// A proxy for the json-server to run on the frontend port
app.use(
  '/api',
  createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true })
);

// Serve the index.html file for all routes (to handle routing with client-side JS)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = 3000;
http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
