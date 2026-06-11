import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';

export const registerUser = asyncHandler(
    async(req,res,next)=>{
    
    
    const existingUser = await User.findOne({email});
    if(existingUser){
         return res.status(400).json({
        message: "User already exists",
      });
    }

    const hassPass = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hassPass
    })

    const token = jwt.sign(
        {
            id:user._id,

    },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d",
    }
)
 res.status(201).json({
    message: "User registred successfully",
    token,
    user:{
        id:user._id,
        name:user.name,
        email:user.email
    },
 });



}
);

export const loginUser = asyncHandler(
    async(req,res,next)=>{
    
        const {email,password} = req.body;


        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
              return res.status(400).json({
                message:"Invalid credentials"
            })
        }
const token = jwt.sign(
        {
            id:user._id,

    },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d",
    }
)
         res.status(200).json({
    message: "User login successfully",
    token,
    user:{
        id:user._id,
        name:user.name,
        email:user.email
    },
 });
    
}
);