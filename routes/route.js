import express from "express";
import {createPost,deletePost,updatePost,likePost,commentPost, getPosts, getPostsBySearch, getPost} from '../controllers/control.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.get('/',getPosts)
router.post('/',auth,createPost)
router.delete('/delete/:id',auth,deletePost)
router.patch('/update/:id',auth,updatePost)
router.patch('/like/:id/likepost',auth,likePost);
router.post('/:id/commentpost', commentPost);

export default router