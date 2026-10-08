import express from 'express';
import { createGroup, getGroups, joinGroup } from '../controllers/groupController.js';
import { checkAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', checkAuth, createGroup);
router.get('/', checkAuth, getGroups);
router.post('/:id/join', checkAuth, joinGroup);

export default router;