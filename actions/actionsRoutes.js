const express = require('express');
const dbActions = require('../data/helpers/actionModel.js');
const router = express.Router();

// api/actions

router.get('/', (req, res) => {
	dbActions
		.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The actions information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	dbActions
		.get(req.params.id)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The action information could not be retrieved.' });
		});
});

router.post('/', (req, res) => {
	const newAction = req.body;
	if (
		!newAction.hasOwnProperty('project_id') ||
		!newAction.hasOwnProperty('description') ||
		!newAction.hasOwnProperty('notes') ||
		!newAction.hasOwnProperty('completed')
	) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide project_id, description, notes, completed status for new action.' });
	}
	dbActions
		.insert(newAction)
		.then((createdAction) => {
			res.status(201).json(createdAction);
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error while saving the action to the database' });
		});
});

router.delete('/:id', (req, res) => {
	dbActions
		.remove(req.params.id)
		.then((numOfDeletedActions) => {
			if (!numOfDeletedActions) {
				res.status(404).json({ error: 'The action with the specified ID does not exist.' });
			} else {
				res.status(204).end();
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The action could not be removed' });
		});
});

router.put('/:id', (req, res) => {
	const actionToUpdate = req.body;
	if (
		!actionToUpdate.hasOwnProperty('project_id') ||
		!actionToUpdate.hasOwnProperty('description') ||
		!actionToUpdate.hasOwnProperty('notes') ||
		!actionToUpdate.hasOwnProperty('completed')
	) {
		res.status(400).json({
			errorMessage: 'Please provide project_id, description, notes, completed status for action.'
		});
	}
	dbActions
		.update(req.params.id, actionToUpdate)
		.then((updatedAction) => {
			if (!updatedAction) {
				res.status(404).json({ error: 'The action with the specified ID does not exist.' });
			} else {
				res.status(200).json(updatedAction);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The action information could not be modified.' });
		});
});

module.exports = router;
