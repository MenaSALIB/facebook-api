import express from 'express';
import { createEvent, getEvents } from '../controllers/eventController.js';
import { checkAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', checkAuth, createEvent);
router.get('/', checkAuth, getEvents);

export default router;