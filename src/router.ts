import {Router} from 'express'
import {body,validationResult} from 'express-validator'
import { createPost, deletePost, getCommentOfPost, getOnePost, getPosts, updatePost } from './handlers/product';
const router = Router()

// Post Routes
router.post('/posts', createPost);
router.get('/posts',getPosts);
router.get('/posts/:id',getOnePost);
router.put('/posts/:id',updatePost);
router.delete('/posts/:id',deletePost );

router.get('/posts/:id/comments', getCommentOfPost);





// Comment Routes
router.post('/posts/:id/comments', (res,req)=>{
    
});
router.get('/comments/:id', (res,req)=>{
    
});
router.put('/comments/:id', (res,req)=>{
    
});
router.delete('/comments/:id', (res,req)=>{
    
});

export default router