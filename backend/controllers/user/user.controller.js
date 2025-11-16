import User from '../../models/user.model.js';
import jwt from 'jsonwebtoken';

export const Signup =async(req,res)=>{
    const {username, email, password}= req.body;
    try{
        const existingEmail=await User.findOne({email});
        const existingUsername=await User.findOne({username});

        if(existingEmail || existingUsername){
            return res.status(400).json({message:"User already exists"});
        }

        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!regex.test(email)){
            return res.status(400).json({message:"Invalid email"});
        }
        const newUser= new User({username,
             email,
             password,
             repositories: [],
             followedUsers: [],
             starRepos: []
            });



        await newUser.save();

        const token= jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token,
            {httpOnly: true,
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        });

        return res.status(201).json({message:"User registered successfully", user: newUser, token});

    }catch(err){
        console.error("Error in Signup controller:", err.message);
    }
}

export const Login =async(req,res)=>{
    const {email, password}= req.body;
    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isValid= await user.comparePassword(password);
        if(!isValid){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token= jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token,
            {httpOnly: true,
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        });
        return res.status(200).json({message:"Login successful", user});

    }catch(err){
        console.error("Error in Login controller:", err.message);
    }
}

export const GetAllUsers =(req,res)=>{}

export const GetUserProfile =(req,res)=>{}

export const UpdateUserProfile =(req,res)=>{}

export const DeleteUserProfile =(req,res)=>{}
