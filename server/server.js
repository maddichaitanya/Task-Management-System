const express = require("express");
const cors =require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");

const app=express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/tasks", taskRoutes);

//test API
app.get("/",(req,res) =>{
    res.send("Task-Management System API is Running Sucessfully!");
});

// Protected test API
app.get("/api/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Access granted! You are authenticated.",
        userId: req.user
    });
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