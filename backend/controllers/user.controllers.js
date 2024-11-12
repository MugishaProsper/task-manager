import { User, Task } from '../models/user.models.js';

export const addTask = async (req, res) => {
  const { description, dueAt } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const newTask = new Task({ owner: userId, description, dueAt });
    await newTask.save();
    return res.status(200).json({ message: "Task created", newTask });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }
    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "An error occurred while deleting the task" });
  }
};

export const updateTask = async (req, res) => {
  const { taskId, updates } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }
    Object.assign(task, updates);
    await task.save();
    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "An error occurred while updating the task" });
  }
};

export const finishTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }
    task.status = 'done';
    await task.save();
    return res.status(200).json({ message: "Task marked as done", task });
  } catch (error) {
    console.error("Error finishing task:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchAllTasks = async (req, res) => {
  const userId = req.user._id;
  try {
    const tasks = await Task.find({ owner: userId });
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    return res.status(200).json({ message: "Tasks retrieved successfully", tasks });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const customSearchTasks = async (req, res) => {
  const { keywords } = req.body;
  const userId = req.user._id;
  try {
    const tasks = await Task.find({ owner: userId, description: { $regex: keywords, $options: 'i' } });
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found matching the keywords." });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error searching tasks:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
