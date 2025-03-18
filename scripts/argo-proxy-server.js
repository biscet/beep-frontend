const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api/processing-dev', createProxyMiddleware({
  target: process.env.PROCESSING_HOST,
  changeOrigin: true,
  pathRewrite: {
    '^/api/processing-dev': '',
  },
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Proxy Error', details: err.message });
  },
}));

app.use('/api/projects-dev', createProxyMiddleware({
  target: process.env.PROJECTS_HOST,
  changeOrigin: true,
  pathRewrite: {
    '^/api/projects-dev': '', 
  },
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Proxy Error', details: err.message });
  },
}));

app.use('/api/users-dev', createProxyMiddleware({
  target: process.env.USERS_HOST,
  changeOrigin: true,
  pathRewrite: {
    '^/api/users-dev': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Connection', 'keep-alive');
    proxyReq.setHeader('Content-Type', 'text/event-stream');
  },
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Proxy Error', details: err.message });
  },
  timeout: 0,
}));

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`HTTP Proxy Server running on http://localhost:${PORT}`);
});
