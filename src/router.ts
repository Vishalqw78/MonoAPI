import {Router} from 'express'
import {body,validationResult} from 'express-validator'
import { createPost, deletePost, getCommentOfPost, getOnePost, getPosts, updatePost } from './handlers/post';
import { createComment, deletecommentbyid, getcommentbyid, updatecommentbyid } from './handlers/comments';
const router = Router()

// Post Routes
router.post('/posts', createPost);
router.get('/posts',getPosts);
router.get('/posts/:id',getOnePost);
router.put('/posts/:id',updatePost);
router.delete('/posts/:id',deletePost );

router.get('/posts/:id/comments', getCommentOfPost);





// Comment Routes
router.post('/posts/:id/comments', createComment);
router.get('/comments/:id',getcommentbyid);
router.put('/comments/:id',updatecommentbyid);
router.delete('/comments/:id',deletecommentbyid);

export default router