const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/tasks", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const tasks = await Task.find({ userId });
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title, dueDate, priority, category, description, userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const task = new Task({ title, dueDate, priority, category, description, userId });
  await task.save();
  res.status(201).json(task);
});


app.put("/tasks/:id", async (req, res) => {
  const { userId } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (task.userId !== userId) return res.status(403).json({ error: "Unauthorized" });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const { userId } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (task.userId !== userId) return res.status(403).json({ error: "Unauthorized" });

  await task.deleteOne();
  res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
