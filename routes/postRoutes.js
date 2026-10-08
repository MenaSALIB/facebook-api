import express from 'express';
import { createPost, getPosts, toggleLike, addComment } from '../controllers/postController.js';
import { checkAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', checkAuth, createPost);
router.get('/', checkAuth, getPosts);
router.post('/:id/like', checkAuth, toggleLike);
router.post('/:id/comments', checkAuth, addComment);

export default router;