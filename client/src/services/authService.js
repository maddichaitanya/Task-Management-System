import API from "./api";

// Register User
export const registerUser = async (userData) => {
    const response = await API.post("/auth/register", userData);

    return response.data;
};

// Login User
export const loginUser = async (userData) => {
    const response = await API.post("/auth/login", userData);

    // Save JWT token
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    // Save logged-in user details
    if (response.data.user) {
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );
    }

    return response.data;
};

// Logout User
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};