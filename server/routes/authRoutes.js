//It creates a POST API endpoint and connects it to our registration controller.

const express=require("express");

const router=express.Router();

const {registerUser}=require("../controllers/authController");

//Register API

router.post("/register",registerUser);

module.exports=router;