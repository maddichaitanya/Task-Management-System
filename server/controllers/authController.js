const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER USER

const registerUser=async (req,res) =>{

    try{
        // get data from request body
        const{name,email,password} = req.body;

        // Check required fields
        
        if(!name || !email || !password){
            return res.status(400).json({
                meassage:"Please provide all required fields"
            });
        }

        //Check existing User

        const existingUser=await User.findOne({
            email
        });

        if(existingUser){
            return res.status(409).json({
                message:"User already exists"
            });
        }

        //Hash Password
        const hashesPassword=await bcrypt.hash(password,10);

        //create new User 
        const user=await User.create({
            name,
            email,
            password:hashesPassword
        });

        //console.log(user);
    //send Response 

    return res.status(201).json({
        message:"User Registed OK!",

        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });
    }
    catch(error){
        console.log("Reisteration Error: " , error);
        res.status(500).json({
            message:"Registeration faild",
            error:error.meassage
        });
    }
};

//Login User 

const loginUser=async (req,res) =>{
    try{
        //Get Email and Password

        const {email,password}=req.body;

        //validate Fileds

        if(!email || !password){
            return res.status(400).json({
                message:"Email and Password are Required"
            });
        }

        //find User 

        const user =await User.findOne({
            email:email.toLowerCase().trim()
        });

        if(!user){
            return res.status(401).json({
                message:"Invalid Email Or Password"
            });
        }

        //Compare Password

        const isPasswordMatch=await bcrypt.compare(
            password,
            user.password
        );


        if(!isPasswordMatch){
            return res.status(401).json({
                message: "Inavlid email or password"
            });
        }

        //Genarate JWT Token 

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        //  send Response
        return res.status(200).json({
            message:"Login SuccessFull",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });
    }
    catch(error){
        console.log("Login Error :",error);

        return res.status(500).json({
            message:"Login Failed",
            error:error.message
        });
    }
};

module.exports={
    registerUser,
    loginUser
};