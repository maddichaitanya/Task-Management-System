const express = require("express");
const cors =require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app=express();

//middleware
app.use(cors());
app.use(express.json());

//test API

app.get("/",(req,res) =>{
    res.send("Task-Management System API is Running Sucessfully!");
});

// Start server after database connection
const PORT=process.env.PORT || 5000;

const startServer=async ()=>{

    await connectDB();

    app.listen(PORT,() => {
        console.log(`server running on port number ${PORT}`);
    });
};

startServer();