const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/TaskManager', {
  useNewUrlParser: true
}).then(() => {
  console.log('Connected to MongoDB successfully.')
}).catch((err) => {
  console.log('Error while connecting to MongoDB')
})

module.exports = {
  mongoose
}