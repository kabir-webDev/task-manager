import Task from "../database/models/Task.js";

// Create a new task
const createTask = async (taskData) => {
  try {
    const newTask = await Task.create(taskData);
    return newTask;
  } catch (error) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};

// Get all tasks
const getAllTasks = async () => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw new Error(`Error getting tasks: ${error.message}`);
  }
};

// Get a task by ID
const getTaskById = async (taskId) => {
  try {
    const task = await Task.findById(taskId);
    return task;
  } catch (error) {
    throw new Error(`Error getting task by ID: ${error.message}`);
  }
};

// Update a task by ID
const updateTaskById = async (taskId, updatedTaskData) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updatedTaskData,
      { new: true }
    );
    return updatedTask;
  } catch (error) {
    throw new Error(`Error updating task by ID: ${error.message}`);
  }
};

// Delete a task by ID
const deleteTaskById = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return deletedTask;
  } catch (error) {
    throw new Error(`Error deleting task by ID: ${error.message}`);
  }
};

export { createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById };
