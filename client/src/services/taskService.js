import API from "./api";

// Get all tasks
export const getTasks = async () => {
    const response = await API.get("/tasks");
    return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
    const response = await API.post("/tasks", taskData);
    return response.data;
};

// Update task
export const updateTask = async (id, taskData) => {
    const response = await API.put(`/tasks/${id}`, taskData);
    return response.data;
};

// Delete task
export const deleteTask = async (id) => {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
};