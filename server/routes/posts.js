import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';         //must add .js (in react its ok but in node must add)
import auth from '../middleware/auth.js';           //we're on backend gotta type auth.js

const router = express.Router();

//https://localhost:4000/posts
router.get('/', getPosts);              //here we execute the function getPosts (which came from controllers/posts.js)
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);       //patch is used for updating existing document - for updating we need id, for creating we don't
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;

//everyone can see post (getPosts), but only users logged in can createPost