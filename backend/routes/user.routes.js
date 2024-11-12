import express from 'express';
import { addTask, customSearchTasks, deleteTask, fetchAllTasks, finishTask } from '../controllers/user.controllers.js';


const router = express.Router();

router.post('/add-task', addTask);
router.get('/all-tasks', fetchAllTasks);
router.get('/custom-search', customSearchTasks);
router.post('/task/:id/finish', finishTask);
router.post('/task/:id/delete', deleteTask);


export default router