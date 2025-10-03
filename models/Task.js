const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  dueDate: String,
  priority: String,
  category: String
});

module.exports = mongoose.model('Task', taskSchema);
