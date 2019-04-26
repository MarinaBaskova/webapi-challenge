const express = require('express');
const dbProjects = require('../data/helpers/projectModel.js');

const router = express.Router();

// api/projects

router.get('/', (req, res) => {
	dbProjects
		.get()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json({
				error: 'The project information could not be retrieved'
			});
		});
});

module.exports = router;
