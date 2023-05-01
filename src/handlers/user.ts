import prisma from "../db";
import jwt from 'jsonwebtoken'
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser =async (req,res) => {
        // const user = await prisma.user.create({
        //     data : {
        //         username : req.body.username,
        //         password : await hashPassword(req.body.password),
        //     }
        // })

        const user = await prisma.user.create({
            data: {
                name : req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: await hashPassword(req.body.password),
            }
        })
    
        const token = createJWT(user)
        res.json({token})
    
}

export const signin = async (req,res) => {
    const user = await prisma.user.findUnique({
        where : {
            email : req.body.email
        }
     })

    const isValid = await comparePasswords(req.body.password,user.password);

    if(!isValid){
        res.status(401)
        res.json({message : 'nope '})
        return;
    }

    const token = createJWT(user)
    res.json({token})
}

export const allusers = async (req,res) => {
    const users = await prisma.user.findMany();
    res.json({data : users})   
}

export const userByid = async (req,res) => {
    const users = await prisma.user.findUnique({
        where:{
            id : req.params.id
        }
    });
    res.json({data : users})   
}

export const UpdateUserDetails = async (req,res) => {
    const users = await prisma.user.findUnique({
        where:{
            id : req.params.id
        }
    });
    const updateUsers = await prisma.user.update({
        where:{
            id : req.params.id
        },
        data:{
            name:req.body.name || users.name,
            password: await hashPassword(req.body.password) || users.password,
            userimg: req.body.userimg||users.userimg
        }
    });
    res.json({data : updateUsers})   
}
export const deleteSelfUser = async (req, res) => {
  try {
    const deleteComments = await prisma.comment.deleteMany({
      where: {
        authorId: req.user.id,
      },
    })

    const deletePosts = await prisma.post.deleteMany({
      where: {
        authorId: req.user.id,
      },
    })

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decodedToken.id

    await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}