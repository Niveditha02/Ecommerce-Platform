// get the name, email and password to create a business logic for this
//check if  the user already exist and if exist give 400 invalid request
//hash the password
//create the user.

//signin user
//get the email, password to find the user
//check if the user is valid
//send the token
//store in cookies


import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //find the email id
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "user already exists" });
        }


        //hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        //create the user
        await User.create({
            name,
            email,
            password: hashPassword
        });
        res.json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: error.message || "server error" });
    }
}

export const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        //generate the token and return
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

        return res.json({ message: "User logged in successfully" });


    } catch (err) {
        return res.status(500).json({ message: err.message || "server error" })
    }
}