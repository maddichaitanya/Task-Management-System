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

const updateTask = async(req,res) =>{

    try{
        const { title, description, priority, status, dueDate} = req.body;

        // only allow these fileds to be upadate 
        const updates={};

        if(title !== undefined ) updates.title=title;
        if(description !== undefined) updates.description=description;
        if(priority !== undefined) updates.priority=priority;
        if(status !== undefined) updates.status=status;
        if(dueDate !== undefined) updates.dueDate=dueDate;

        const task=await Task.findOneAndUpdate(
            {
                _id:req.params.id,
                user: req.user
            },
            updates,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if(!task){
            return res.status(404).json({
                message:"Task not Found"
            });
        }

        res.status(200).json({
            message:"Task update sucessfully!",
            task
        });
    }
    catch(error){
        return res.status(500).json({
            message:" Failed to update task",
            error:error.message
        });
    }
};

// 4. Delete an existing task

const deleteTask=async (req,res) =>{

    try{

        const task=await Task.findOneAndDelete({
            _id:req.params.id,
            user:req.user
        });

        if(!task){
            return res.status(404).json({
                message: " Task not found"
            });
        }

        res.status(200).json({
            message:"Task Deleted Successfully! "
        });
    }
    catch(error){
        res.status(500).json({
            message:"Failed to delete task",
            error:error.message
        });
    }
};

module.exports={
    createTask,
    getTasks,
    updateTask,
    deleteTask
};