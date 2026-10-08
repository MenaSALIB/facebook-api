import express from 'express';
import { getProfile, addFriend } from '../controllers/userController.js';
import { checkAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', checkAuth, getProfile);
router.post('/friends/:id', checkAuth, addFriend);

export default router;