const express = require('express');
const dbProjects = require('../data/helpers/projectModel.js');

const router = express.Router();

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

router.get('/:id', (req, res) => {
	dbProjects
		.get(req.params.id)
		.then((projectwithActions) => {
			res.status(200).json(projectwithActions);
		})
		.catch((err) => {
			res.status().json({ error: 'The project information could not be retrieved' });
		});
});

router.get('/:id/actions', (req, res) => {
	dbProjects
		.getProjectActions(req.params.id)
		.then((actonsForProject) => {
			res.status(200).json(actonsForProject);
		})
		.catch((err) => {
			res.status().json({ error: 'The list of actions for project information could not be retrieved' });
		});
});

router.post('/', (req, res) => {
	const newProject = req.body;
	if (
		!newProject.hasOwnProperty('name') ||
		!newProject.hasOwnProperty('description') ||
		!newProject.hasOwnProperty('completed')
	) {
		res.status(400).json({ error: 'Please provide name and description and  completed status for the project.' });
	}
	dbProjects
		.insert(newProject)
		.then((createdProject) => {
			res.status(201).json(createdProject);
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error while saving the project to the database' });
		});
});

router.delete('/:id', (req, res) => {
	dbProjects
		.remove(req.params.id)
		.then((numOfDeletedProjects) => {
			if (!numOfDeletedProjects) {
				res.status(404).json({ error: 'The project with the specified ID does not exist.' });
			} else {
				res.status(204).end();
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error while deleting the project from the database' });
		});
});

router.put('/:id', (req, res) => {
	const projectToUpdate = req.body;
	if (
		!projectToUpdate.hasOwnProperty('name') ||
		!projectToUpdate.hasOwnProperty('description') ||
		!projectToUpdate.hasOwnProperty('completed')
	) {
		res.status(400).json({ error: 'Please provide name and description and  completed status for the project.' });
	}

	dbProjects
		.update(req.params.id, projectToUpdate)
		.then((updatedProject) => {
			if (!updatedProject) {
				res.status(404).json({ error: 'The project with the specified ID does not exist.' });
			} else {
				res.status(200).json(updatedProject);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The project information could not be modified.' });
		});
});

module.exports = router;
