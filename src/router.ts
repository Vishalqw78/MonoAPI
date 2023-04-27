import {Router} from 'express'
import {body,validationResult} from 'express-validator'
const router = Router()



// Post Routes
router.post('/posts', (res,req)=>{
    
});
router.get('/posts', (req,res)=>{
    res.json({message :'testing'})
});
router.get('/posts/:id', (res,req)=>{
    
});
router.put('/posts/:id', (res,req)=>{
    
});
router.delete('/posts/:id', (res,req)=>{
    
});
router.get('/posts', (res,req)=>{
    
});
router.get('/posts/:id/comments', (res,req)=>{
    
});





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