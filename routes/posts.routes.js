import express from 'express'
import {pool} from '../config/db.js'
import { createPosts, getPosts,updatePosts,deletePosts, getPostById } from '../controllers/posts.controller.js'
const router = express.Router()

router.get('/',getPosts)
router.get('/:id',getPostById)
router.post('/',createPosts)
router.put('/:id',updatePosts)
router.delete('/:id',deletePosts)

export default router