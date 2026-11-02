const User=require("../models/User");
const bcrypt=require("bcryptjs");

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

module.exports={registerUser};