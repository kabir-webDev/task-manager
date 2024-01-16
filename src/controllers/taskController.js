import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
  } from '../services/taskService.js'; 
  import jwt from 'jsonwebtoken';
  
  // Create a new task
  const createTaskController = async (req, res) => {
    try {
      const taskData = req.body;
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, 'kabirTheSecret');
    let assignedByInfo = null;
    if (decodedToken) {
      assignedByInfo = {
        id: decodedToken.userId,
        name: decodedToken.username,
        email: decodedToken.email,
      };
    } else {
      throw new Error("No assigned_by information found in the token.");
    }

    // Basic validation checks
    if (!taskData.title || !taskData.description) {
      throw new Error("Title and description are required fields.");
    }

    // Enum validation for 'status'
    if (taskData.status && !['Todo', 'In Progress', 'Completed'].includes(taskData.status)) {
      throw new Error("Invalid value for 'status'. Allowed values are 'Todo', 'In Progress', 'Completed'.");
    }

    // Enum validation for 'priority'
    if (taskData.priority && !['High', 'Medium', 'Low'].includes(taskData.priority)) {
      throw new Error("Invalid value for 'priority'. Allowed values are 'High', 'Medium', 'Low'.");
    }

    // Date validation for 'dueDate'
    if (!taskData.dueDate) {
      throw new Error("Invalid value for 'dueDate'. It should be a valid Date.");
    }

    // Validation for nested 'assigned_to'
    if (taskData.assigned_to && (!taskData.assigned_to.id || !taskData.assigned_to.name || !taskData.assigned_to.email)) {
      throw new Error("Invalid value for 'assigned_to'. 'id', 'name', and 'email' are required.");
    }
    
    // Validation for nested 'attachments'
    // if (taskData.attachments && !Array.isArray(taskData.attachments)) {
    //   throw new Error("Invalid value for 'attachments'. It should be an array.");
    // }

    // Validation for nested 'comments'
    // if (taskData.comments && !Array.isArray(taskData.comments)) {
    //   throw new Error("Invalid value for 'comments'. It should be an array.");
    // }
    if (assignedByInfo) {
      taskData.assigned_by = assignedByInfo;
    }
      const newTask = await createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all tasks
  const getAllTasksController = async (req, res) => {
    try {
      const tasks = await getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a task by ID
  const getTaskByIdController = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await getTaskById(taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a task by ID
  const updateTaskByIdController = async (req, res) => {
    try {
      const taskId = req.params.id;
      const updatedTaskData = req.body;
      const updatedTask = await updateTaskById(taskId, updatedTaskData);
  
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a task by ID
  const deleteTaskByIdController = async (req, res) => {
    try {
      const taskId = req.params.id;
      const deletedTask = await deleteTaskById(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json(deletedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskByIdController,
    deleteTaskByIdController,
  };
  