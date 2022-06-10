const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json());

const projectsRouter = require('./projects/projects-router');


server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`hello`);
  });

module.exports = server;
