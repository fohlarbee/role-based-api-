import UserModel from "@/models/User";
import { RequestHandler } from "express";
import {compare, genSalt, hash} from 'bcrypt'
import  jwt from 'jsonwebtoken'

export const createUser: RequestHandler = async (req, res) => {
    const {email, password, name} = req.body;


    try {
        const oldUser = await UserModel.findOne({email});
        if(oldUser){
            res.status(403).json({error: 'User already exist'})
        }
        const salt = await genSalt(10);
    
        const hashedPassword = await hash(password, salt);
        console.log(hashedPassword)
    
        const user = await UserModel.create({email, password: hashedPassword, name})
    
        return res.status(201).json({success:true, 'UserCreated': {user}})
        
    } catch (error) {
        if(error instanceof Error)
            console.log(error.stack)
        
    }

   



} 
export const signInUser: RequestHandler = async(req, res) => {
    const {email, password} = req.body; 

    try{
        const user = await UserModel.findOne({email});
    if(!user)
      return res.status(403).json({error:'No user exits'});
 

     const isMatched = await compare(password, user?.password!)

    if(!isMatched)
       return res.status(403).json({error:'Password Mismatch'})

    const token =  jwt.sign({id: user?._id.toString()}, 'secretforuser')
    

   return res.status(200).json({succes:true, token, profile:{name:user.name, email: user.email, role:user.role}})

    }catch(error){
        if(error instanceof Error)
            console.log(error.stack)
    }

    
}



export const privateRoute: RequestHandler = async(req, res) => {
    
   return res.status(200).json({"Message":"Welcome to Private route"})
}


export const adminRoute: RequestHandler = (req, res) => {

    return res.status(200).json({"message": "welcome to admin route"})
}

export const getProfile: RequestHandler = (req, res) => {
    return res.status(201).json({
        profile:{
            email:req.user.email,
            name: req.user.name,
            role: req.user.role
        }

    })
}