import express from 'express';
import {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskByIdController,
  deleteTaskByIdController,
} from '../../controllers/taskController.js'; // Update with the correct path to your taskController file

const router = express.Router();

// Create a new task
router.post('/', createTaskController);

// Get all tasks
router.get('/', getAllTasksController);

// Get a task by ID
router.get('/:id', getTaskByIdController);

// Update a task by ID
router.put('/:id', updateTaskByIdController);

// Delete a task by ID
router.delete('/:id', deleteTaskByIdController);

export default router;
