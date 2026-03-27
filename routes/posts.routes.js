import express from 'express'
import { payload ,params} from '../schema/zod.schema.js'
import { validate } from '../middleware/validationMiddleware.js'
import { createPosts, getPosts,updatePosts,deletePosts, getPostById } from '../controllers/posts.controller.js'
import { getLimiter } from '../utils/rateLimiter.js'
const router = express.Router()

router.get('/',getPosts)
router.get('/:id',validate(params),getLimiter,getPostById)
router.post('/',validate(payload),createPosts)
router.put('/:id',updatePosts)
router.delete('/:id',deletePosts)

export default router