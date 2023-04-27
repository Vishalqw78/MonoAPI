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


