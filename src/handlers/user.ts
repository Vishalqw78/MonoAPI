import prisma from "../db";
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
export const DeleteSelf = async (req,res) => {
    const users = await prisma.user.findUnique({
        where:{
            id : req.user.id
        }
    });
    const deletepost = await prisma.post.deleteMany({
        where:{
            Author: req.user.id
        }
    })
    const deletecomment = await prisma.comment.deleteMany({
        where:{
            author: req.user.id
        }
    })
    const DeleteUsers = await prisma.user.delete({
        where:{
            id : users.id
        }
    });
    res.json({data : users})   
}