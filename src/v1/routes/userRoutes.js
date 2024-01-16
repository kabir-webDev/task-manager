import express from 'express';
const router = express.Router();
import userController from '../../controllers/userController.js';
import apicache from 'apicache';

const cache = apicache.middleware;

// get all users
router.get("/", cache("5 minutes"), userController.getAllUsers);
// add new user
router.post("/", userController.createNewUser);

export { router };