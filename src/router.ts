import {Router} from 'express'
import {body,validationResult} from 'express-validator'
import { createPost, deletePost, getCommentOfPost, getOnePost, getPosts, updatePost } from './handlers/post';
import { createComment, deletecommentbyid, getcommentbyid, updatecommentbyid } from './handlers/comments';
import {  UpdateUserDetails, allusers, deleteSelfUser, userByid } from './handlers/user';
import { commentCount, postCount, postPerUser, userCount } from './handlers/Analytics';
const router = Router()

// Post Routes
router.post('/posts', createPost);
router.get('/posts',getPosts);
router.get('/posts/:id',getOnePost);
router.put('/posts/:id',updatePost);
router.delete('/posts/:id',deletePost );

router.get('/posts/:id/comments', getCommentOfPost);

//Author Routes
router.get('/users',allusers)
router.get('/users/:id',userByid)
router.put('/users/:id',UpdateUserDetails)
router.delete('/users',deleteSelfUser)

// Comment Routes
router.post('/posts/:id/comments', createComment);
router.get('/comments/:id',getcommentbyid);
router.put('/comments/:id',updatecommentbyid);
router.delete('/comments/:id',deletecommentbyid);

// Routes for data Analysis
router.get('/user-count',userCount);
router.get('/post-count',postCount);
router.get('/comment-count',commentCount);
router.get('/postperuser',postPerUser);

export default router