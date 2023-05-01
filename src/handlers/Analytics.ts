import prisma from "../db";

export const userCount = async (req,res)=>{
    const count = await prisma.user.count();
    res.json({data: count})
}

export const postCount = async (req,res)=>{
    const count = await prisma.post.count();
    res.json({data: count})
}

export const commentCount = async (req,res)=>{
    const count = await prisma.comment.count();
    res.json({data: count})
}
export const postPerUser = async (req,res)=>{
    const usersWithPostCount = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          post: {
            select: {
              id: true,
            },
          },
        },
      })
      const usersWithPostCountArray = usersWithPostCount.map(user => ({ 
        id: user.id, 
        name: user.name, 
        postCount: user.post.length 
      }));
      res.json({data: usersWithPostCountArray})
}