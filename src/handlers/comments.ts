import prisma from "../db";

/* handlers for comment handling*/
export const createComment = async(req,res)=>{
    const postId = req.params.id;
    const authorid = req.user.id;
  const value = req.body.value;

  const newComment = await prisma.comment.create({
    data: {
      author:{ connect: { id: authorid } },
      Post: { connect: { id: postId } },
      value,
    }
  });
  res.json({data: newComment})

}

export const getcommentbyid = async(req,res)=>{
    const commentid = req.params.id;

    const getcomment = await prisma.comment.findUnique({
        where:{
            id:commentid
        }
    });
    res.json({data: getcomment})
}
export const updatecommentbyid = async(req,res)=>{
    const commentid = req.params.id;

    

    const updatecomment = await prisma.comment.update({
        where:{
            id:commentid
        },
        data:{
            value:req.body.value
        }
    });
    res.json({data:updatecomment})
}
export const deletecommentbyid = async(req,res)=>{
    const commentid = req.params.id;

    

    const updatecomment = await prisma.comment.delete({
        where:{
            id:commentid
        }
    });
    res.json({data:updatecomment})
}