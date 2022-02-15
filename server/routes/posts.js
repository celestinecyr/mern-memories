import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';         //must add .js (in react its ok but in node must add)

const router = express.Router();

//https://localhost:4000/posts
router.get('/', getPosts);              //here we execute the function getPosts (which came from controllers/posts.js)
router.post('/', createPost);
router.patch('/:id', updatePost);       //patch is used for updating existing document - for updating we need id, for creating we don't
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;