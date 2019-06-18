const express = require('express')
const app = express()

const { mongoose } = require('./db/mongoose')
// Load mongoose models
const { List, Task } = require('./db/models')

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.json())

app.get('/lists', async (req, res) => {
	const list = await List.find({})
	res.send(list)
})

app.post('/lists', async (req, res) => {
	const title = req.body.title
	const newList = new List({
		title
	})

	const listDoc = await newList.save()
	res.send(listDoc)
})

app.patch('/lists/:id', async (req, res) => {
	const updatedListDoc = await List.findOneAndUpdate({ _id: req.params.id }, {
		$set: req.body
	})

	res.sendStatus(200)
})

app.delete('/lists/:id', async (req, res) => {
	await List.findOneAndRemove({
		_id: req.params.id
	})
	res.sendStatus(204)
})

app.get('/lists/:listId/tasks', async (req, res) => {
	const listId = req.params.listId
	const taskList = await Task.find({ _listId: listId })
	res.send(taskList)
})

app.post('/lists/:listId/tasks', async (req, res) => {
	const newTaskTitle = req.body.title
	const listId = req.params.listId

	const newTask = new Task({
		title: newTaskTitle,
		_listId: listId
	})

	const result = await newTask.save()

	res.send(result)
})

app.patch('/lists/:listId/tasks/:taskId', async (req, res) => {
	const newTaskTitle = req.body.title
	const listId = req.params.listId
	const taskId = req.params.taskId

	const result = await Task.findOneAndUpdate({
		_id: taskId,
		_listId: listId
	}, {
			$set: req.body
		})

	res.sendStatus(200)
})

app.delete('/lists/:listId/tasks/:taskId', async (req, res) => {
	const listId = req.params.listId
	const taskId = req.params.taskId

	await Task.findOneAndRemove({
		_id: taskId,
		_listId: listId
	})

	res.sendStatus(204)
})



app.listen(3000, () => {
	console.log('Listening on port http://localhost:3000....')
})