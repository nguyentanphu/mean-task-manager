const express = require('express')
const app = express()

const { mongoose } = require('./db/mongoose')
// Load mongoose models
const { List, Task } = require('./db/models')

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

app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000....')
})