import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signupUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        //find the email id
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json({message:"user already exists"});
        }

   
    //hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    //create the user
    await User.create({
        name,
        email,
        password:hashPassword
    });
    res.json({message:"User registered successfully"});

    }catch(error){
        res.status(500).json({message:"server error"});
    }
}