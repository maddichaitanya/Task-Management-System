const Task=require("../models/Task");

// Create a new task

const createTask =async (req,res) =>{
    try{

        const {title, description, priority, status, dueDate }=req.body;

        if(!title){
            return res.status(400).json({
                message:"Task title is required"
            });
        }

        const task=await Task.create({
            title,
            description,
            priority,
            status,
            dueDate,
            user: req.user
        });

        res.status(201).json({
            message: "Task created successfully!",
            task
        });
    }
    catch(error){
        res.status(500).json({
            meassage:"Failed to create Task",
            error:error.message
        });
    }
};


//  2.  Get all Task of logged-in user

const getTasks=async (req,res) =>{

    try{
        const tasks= await Task.find({
            user:req.user
        }).sort({createdAt:-1});

        res.status(200).json({
            message:"Task Fatched Sucessfully!",
            count:tasks.length,
            tasks
        });
    }
    catch(error){
        return res.status(500).json({
            meassage:"Failed to fetch tasks",
            error:error.meassage
        });
    }
};

// 3. Update an existinf task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: id,
                user: req.user
            },
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error("Update Task Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

// 4. Delete an existing task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findOneAndDelete({
            _id: id,
            user: req.user
        });

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error("Delete Task Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports={
    createTask,
    getTasks,
    updateTask,
    deleteTask
};