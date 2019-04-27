const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const projectsRouter = require('./projects/projectsRoutes.js');
const actionsRouter = require('./actions/actionsRoutes.js');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
	res.send('<h2>Welcome to the App</h2>');
});

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;
