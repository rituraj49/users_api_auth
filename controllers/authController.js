import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import jwt from 'jsonwebtoken'
// import cache from 'memory-cache';

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username)
            return res.send({ error: "username is required" });
        else if (!email)
            return res.send({ error: "email is required" });
        else if (!password)
            return res.send({ error: "password is required" });

        // check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "user already exist, please login"
            })
        }

        // add new user
        const hashedPass = await hashPassword(password);
        const newUser = new userModel({
            username, email,
            password: hashedPass
        })
        await newUser.save()
        res.status(201).send({
            success: true,
            message: "user added successfully",
            newUser
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while adding new user",
            error
        })
    }
}

export async function loginController(req, res){
    try {
        
        const {email, password} = req.body;
        if(!email || !password)
        return res.send({
        success:false, 
        error:"email and password is required"
        })

        // check if user is already registered
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(201).send({
                success: false,
                message: "You are not registered, please register first"
            })
        }

        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: "invalid password, try again"
            })
        }

        const token = jwt.sign({_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'2d'}
            )
        return res.status(200).send({
            success: true,
            message: "user logged in successfully",
            user:{
                username : user.username,
                email: user.email
            },
            token
        })
    
    } catch (error) {
        return res.send ({
            success: false,
            message:"error logging in"
        })   
    }
}