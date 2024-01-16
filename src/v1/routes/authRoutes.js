import express from 'express';
import authController from '../../controllers/authController.js';
const router = express.Router();

// add new user
router.post('/register', authController.register);
// login
router.post('/login', authController.login);


export default router;