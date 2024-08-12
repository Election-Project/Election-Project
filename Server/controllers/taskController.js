const { Task, User } = require("../models");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    const task = await Task.create({ title, description, userId });
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({ where: { userId } });
    res.json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      await task.save();
      res.json({ task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (task) {
      // Soft delete: set the `deletedAt` timestamp
      await task.destroy();
      res.json({ message: "Task marked as deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
