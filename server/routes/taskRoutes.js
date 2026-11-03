const express=require("express");
const router=express.Router();

const{ createTask, 
        getTasks,
        updateTask,
        deleteTask }=require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all task routers
router.use(authMiddleware);

//create task

router.post("/",createTask);

// Get all tasks
router.get("/",getTasks);

// Upadte Task
router.put("/:id",updateTask);

// Delete Task
router.delete("/:id",deleteTask);

module.exports=router;