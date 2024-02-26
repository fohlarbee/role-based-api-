import UserModel from "@/models/User";
import { RequestHandler } from "express";
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

declare global{
    namespace Express{
        interface Request{
            user:{
                [key:string]:any
            }
        }
    }
}

export const newUserValidator: RequestHandler = (req, res, next) => {

    //email regex 
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // name regex, for names.... no short names allowed
    const regName = /^[a-zA-Z]+([' -][a-zA-Z]+)*$/
    //password regex, password must include caps, lowercase, numbers and punctuations
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


    const {email, name, password} = req.body;

    try{
        if(!emailRegex.test(email)){
            return res.status(422).json({error: 'Invalid email'})
        }
        if(!regName.test(name)){
            return res.status(422).json({error: 'Invalid name format'})
        }
        if(!passwordRegex.test(password)){
            return res.status(422).json({error: 'Invalid password'})
        }
    }catch(error){
        if(error instanceof Error)
            console.log(error.message)
    }
    


    next();
}

export const IsAuth: RequestHandler =  async(req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        const token = authToken?.split('Bearer ')[1]
        if(!token)
            res.status(403).json({error: "Unauthorized access"})

        
        const payload = jwt.verify(token!, "secretforuser") as {id: string}
        const user = await UserModel.findById(payload.id);
        if(!user){
            res.status(403).json({error: "Unauthorized access"})
        }
        req.user = user!
        


        
    } catch (error) {
        if(error instanceof JsonWebTokenError){
           return res.status(404).json({error:"Unauthorized access"})

        }
        else{
            return res.status(403).json({"message": "something went wrong"})
        }
    }

    next();

    
}


export const isAdmin: RequestHandler = async(req, res, next) => {

    const user =  req.user;
    if(user.role ==="admin"){
        next()
    }
    else{
          return res.status(400).json({"message":"No admin priveledges found"})

    }
    
}