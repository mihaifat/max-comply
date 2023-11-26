const express = require('express');
const server = express();
const port = 3000;
const cors = require('cors');

const TASKS_COLLECTION = require('./mocks/tasksCollection.js').tasks;
const TASK_ITEMS = require('./mocks/taskItems').tasks;

//Server congiguration
server.use(cors());
server.set('port', (process.eventNames.PORT || port));

//Define app routes
server.get('/tasks', function (request, response) {
	const data = {
		status: true,
		data: TASKS_COLLECTION
	};

	setTimeout(() => {
		response.json(data);
	}, 2000);
});

server.get('/tasks/:id', function (request, response) {
	const task = TASK_ITEMS.find(item => item.id.toString() === request.params.id);
	const data = {
		status: true,
		data: task
	};

	setTimeout(() => {
		response.json(data);
	}, 2000);
});

server.post('/tasks/:id', function (request, response) {
	const data = {
		status: true,
		message: 'Task submitted correctly',
	};

	setTimeout(() => {
		response.json(data);
	}, 2000);
})

server.listen(port, () => console.log(`App listening on port ${port}`))
