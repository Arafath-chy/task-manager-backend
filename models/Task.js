<<<<<<< HEAD
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  dueDate: String,
  priority: String,
  category: String
});

module.exports = mongoose.model('Task', taskSchema);
=======
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);
>>>>>>> 28e4895efdf01b5e86b3bf6b6213fd4a72449c8e
