const express = require('express');
const server = express();
const helmet = require('helmet');

const projectsRouter = require('./projects/projectsRoutes.js');

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
	res.send('<h2>Welcome to the App</h2>');
});

server.use('/api/projects', projectsRouter);

module.exports = server;
