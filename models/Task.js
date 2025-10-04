const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  dueDate: String,
  priority: String,
  category: String,
  description: String,
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', taskSchema);
