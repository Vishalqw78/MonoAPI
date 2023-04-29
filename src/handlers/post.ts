import prisma from "../db"
export const getPosts = async(req,res)=>{
    const user =await prisma.user.findUnique({
        where:{
            id : req.user.id
        },
        include:{
            post : true
        }
    })
    res.json({data : user.post})
}

export const getOnePost =async (req,res) => {
    const id = req.params.id;
    
    const post = await prisma.post.findFirst({
        where:{
            id,
            authorId:req.user.id
        }
    })
    res.json({data: post})
}

export const updatePost =async (req,res)=>{
    const postid = req.params.id;
    const existingpost = await prisma.post.findUnique({
        where:{
            id_authorId:{
                id: req.params.id,
                authorId:req.user.id,
            }
        },
    });

    const updating = await prisma.post.update({
        where:{
            id:postid,
        },
        data:{
            title: req.body.title || existingpost.title,
            thumbnail: req.body.thumbnail || existingpost.thumbnail,
            posted: req.body.posted || existingpost.posted,
        }
    })
    res.json({data: updating})
}

export const getCommentOfPost =async (req,res) => {
    const postId = req.params.id;
    const authorId = req.user.id;
    
    const comment = await prisma.comment.findMany({
        where:{
            postId,
            authorId,
        }
    })
    res.json({data: comment})
}

export const createPost = async (req,res)=>{
    try{const post = await prisma.post.create({
        data:{
            title: req.body.title,
            authorId: req.user.id,
            thumbnail : req.body.thumbnail,
            posted: req.body.posted
        }
        // model Post {
        //     id        String    @id @default(uuid())
        //     title     String
        //     content   Content[]
        //     createdAt DateTime  @default(now())
        //     updatedAt DateTime  @updatedAt
        //     Author    User      @relation(fields: [authorId], references: [id])
        //     authorId  String
        //     comment   Comment[]
        //     thumbnail String
        //     posted    Boolean
        //   }
    })
    res.json({data: post})}
    catch(e){
        console.log(e);
    }
}

export const deletePost = async (req,res)=>{
    const deleted = await prisma.post.delete({
        where:{
            id: req.params.id,
        }
    })
    res.json({data: deleted})
}