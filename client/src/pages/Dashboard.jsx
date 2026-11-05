
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    LogOut,
    ListTodo,
    CheckCircle2,
    Clock3,
    Search,
    CalendarDays,
    Menu,
    X,
    Plus
} from "lucide-react";

import {
    getTasks,
    createTask
} from "../services/taskService";

import { logoutUser } from "../services/authService";

import "../styles/dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    // Dashboard states
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // User information
    const [user] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    });

    // Add task modal states
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    // Task form data
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "Todo",
        dueDate: ""
    });

    // Fetch tasks from MongoDB
    const fetchTasks = async () => {
        try {
            setError("");

            const response = await getTasks();

            setTasks(response.tasks || []);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load tasks."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Logout
    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Create new task
    const handleCreateTask = async (e) => {
        e.preventDefault();

        setFormError("");

        if (!formData.title.trim()) {
            setFormError("Please enter a task title.");
            return;
        }

        try {
            setSubmitting(true);

            const taskData = {
                ...formData,
                title: formData.title.trim(),
                description: formData.description.trim()
            };

            // Remove empty due date
            if (!taskData.dueDate) {
                delete taskData.dueDate;
            }

            // Save task in MongoDB
            await createTask(taskData);

            // Refresh task list
            await fetchTasks();

            // Reset form
            setFormData({
                title: "",
                description: "",
                priority: "Medium",
                status: "Todo",
                dueDate: ""
            });

            setShowTaskForm(false);

        } catch (err) {
            setFormError(
                err.response?.data?.message ||
                "Unable to create task."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Task statistics
    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status !== "Completed"
    ).length;

    // Search tasks
    const filteredTasks = tasks.filter((task) =>
        task.title?.toLowerCase().includes(search.toLowerCase())
    );

    // Priority styling
    const getPriorityClass = (priority) => {
        return priority?.toLowerCase() || "medium";
    };

    // Status styling
    const getStatusClass = (status) => {
        if (status === "Completed") return "completed";
        if (status === "In Progress") return "progress";
        return "todo";
    };

    // User name and profile initial
    const userName = user?.name || "User";
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <div className="tf-dashboard">

            {/* Background effects */}
            <div className="dashboard-glow glow-one"></div>
            <div className="dashboard-glow glow-two"></div>

            {/* Sidebar */}
            <aside
                className={`tf-sidebar ${
                    sidebarOpen ? "sidebar-open" : ""
                }`}
            >

                <div className="sidebar-brand">

                    <div className="brand-logo">
                        <LayoutDashboard size={22} />
                    </div>

                    <span>
                        Task<span className="brand-highlight">Flow</span>
                    </span>

                    <button
                        className="mobile-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>

                </div>

                <div className="sidebar-label">
                    WORKSPACE
                </div>

                <nav className="sidebar-nav">

                    <button className="nav-item active">
                        <LayoutDashboard size={19} />
                        Dashboard
                    </button>

                    <button
                        className="nav-item"
                        onClick={() =>
                            document
                                .getElementById("tasks-section")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                })
                        }
                    >
                        <ListTodo size={19} />
                        My Tasks
                    </button>

                </nav>

                <div className="sidebar-bottom">

                    <div className="sidebar-tip">
                        <div className="tip-icon">✦</div>

                        <h4>Stay productive!</h4>

                        <p>
                            Small steps every day lead to big results.
                        </p>
                    </div>

                </div>

            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main content */}
            <main className="tf-main">

                {/* Top Navigation */}
                <header className="tf-topbar">

                    <div className="topbar-left">

                        <button
                            className="mobile-menu"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <p className="topbar-date">
                            <CalendarDays size={14} />
                            YOUR PRODUCTIVITY SPACE
                        </p>

                    </div>

                    <div className="topbar-actions">

                        {/* Logout */}
                        <button
                            className="topbar-logout"
                            onClick={handleLogout}
                        >
                            <LogOut size={17} />
                            Logout
                        </button>

                        {/* Profile avatar */}
                        <div className="topbar-avatar">
                            {userInitial}
                        </div>

                        {/* User name */}
                        <span className="topbar-user">
                            {userName}
                        </span>

                    </div>

                </header>

                <div className="dashboard-content">

                    {/* Welcome Section */}
                    <section className="dashboard-welcome">

                        <div>

                            <span className="welcome-tag">
                                ✦ YOUR WORKSPACE
                            </span>

                            <h1>
                                Good to see you{" "}
                                <span>{userName}!</span>
                            </h1>

                            <p>
                                Organize your work, manage your tasks and make
                                every day productive.
                            </p>

                        </div>

                        <div className="welcome-decoration">

                            <div className="decoration-circle circle-large">

                                <div className="decoration-circle circle-small">
                                    <CheckCircle2 size={36} />
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* Statistics */}
                    <section className="stats-grid">

                        {/* Total tasks */}
                        <div className="stat-card stat-purple">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    <ListTodo size={22} />
                                </div>

                                <span className="stat-caption">
                                    ALL TASKS
                                </span>

                            </div>

                            <h2>{tasks.length}</h2>

                            <p>Total tasks in your workspace</p>

                        </div>

                        {/* Completed tasks */}
                        <div className="stat-card stat-green">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    <CheckCircle2 size={22} />
                                </div>

                                <span className="stat-caption">
                                    COMPLETED
                                </span>

                            </div>

                            <h2>{completedTasks}</h2>

                            <p>Tasks successfully completed</p>

                        </div>

                        {/* Pending tasks */}
                        <div className="stat-card stat-orange">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    <Clock3 size={22} />
                                </div>

                                <span className="stat-caption">
                                    PENDING
                                </span>

                            </div>

                            <h2>{pendingTasks}</h2>

                            <p>Tasks waiting for completion</p>

                        </div>

                    </section>

                    {/* Tasks Section */}
                    <section
                        className="tasks-section"
                        id="tasks-section"
                    >

                        {/* Tasks heading */}
                        <div className="tasks-heading">

                            <div>

                                <span className="section-eyebrow">
                                    YOUR WORK
                                </span>

                                <h2>My Tasks</h2>

                                <p>
                                    Keep track of everything you need to do.
                                </p>

                            </div>

                            <div className="task-heading-actions">

                                {/* Search */}
                                <div className="task-search">

                                    <Search size={18} />

                                    <input
                                        type="text"
                                        placeholder="Search tasks..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />

                                </div>

                                {/* Add Task Button */}
                                <button
                                    className="add-task-button"
                                    onClick={() => {
                                        setFormError("");
                                        setShowTaskForm(true);
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Task
                                </button>

                            </div>

                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="dashboard-message">

                                <div className="loading-spinner"></div>

                                <p>Loading your tasks...</p>

                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="dashboard-error">
                                {error}
                            </div>
                        )}

                        {/* Empty state */}
                        {!loading &&
                            !error &&
                            filteredTasks.length === 0 && (

                                <div className="empty-tasks">

                                    <div className="empty-icon">
                                        <ListTodo size={30} />
                                    </div>

                                    <h3>
                                        {search
                                            ? "No matching tasks"
                                            : "No tasks yet"}
                                    </h3>

                                    <p>
                                        {search
                                            ? "Try searching with a different task name."
                                            : "Your tasks will appear here once you create them."}
                                    </p>

                                </div>
                            )}

                        {/* Task list */}
                        <div className="task-list">

                            {filteredTasks.map((task) => (

                                <article
                                    className="task-card"
                                    key={task._id}
                                >

                                    <div className="task-card-left">

                                        <div className="task-indicator"></div>

                                        <div>

                                            <h3>{task.title}</h3>

                                            <p>
                                                {task.description ||
                                                    "No description provided"}
                                            </p>

                                            <div className="task-meta">

                                                <span
                                                    className={`priority-badge ${getPriorityClass(
                                                        task.priority
                                                    )}`}
                                                >
                                                    {task.priority} Priority
                                                </span>

                                                <span
                                                    className={`status-badge ${getStatusClass(
                                                        task.status
                                                    )}`}
                                                >
                                                    {task.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="task-card-icon">
                                        <CheckCircle2 size={21} />
                                    </div>

                                </article>

                            ))}

                        </div>

                    </section>

                    {/* Add Task Modal */}
                    {showTaskForm && (

                        <div
                            className="task-modal-overlay"
                            onMouseDown={(e) => {
                                if (e.target === e.currentTarget) {
                                    setShowTaskForm(false);
                                }
                            }}
                        >

                            <div className="task-modal">

                                {/* Modal header */}
                                <div className="task-modal-header">

                                    <div>

                                        <span className="section-eyebrow">
                                            TASK MANAGEMENT
                                        </span>

                                        <h2>Create New Task</h2>

                                        <p>
                                            Add a new task to your workspace.
                                        </p>

                                    </div>

                                    <button
                                        className="modal-close"
                                        type="button"
                                        onClick={() => setShowTaskForm(false)}
                                    >
                                        <X size={21} />
                                    </button>

                                </div>

                                {/* Task form */}
                                <form
                                    onSubmit={handleCreateTask}
                                    className="task-form"
                                >

                                    {/* Title */}
                                    <div className="form-group">

                                        <label>Task Title *</label>

                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Enter task title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        />

                                    </div>

                                    {/* Description */}
                                    <div className="form-group">

                                        <label>Description</label>

                                        <textarea
                                            name="description"
                                            placeholder="Describe your task..."
                                            rows="3"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                        />

                                    </div>

                                    {/* Priority and Status */}
                                    <div className="form-row">

                                        <div className="form-group">

                                            <label>Priority</label>

                                            <select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>

                                        </div>

                                        <div className="form-group">

                                            <label>Status</label>

                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Todo">Todo</option>
                                                <option value="In Progress">
                                                    In Progress
                                                </option>
                                                <option value="Completed">
                                                    Completed
                                                </option>
                                            </select>

                                        </div>

                                    </div>

                                    {/* Due date */}
                                    <div className="form-group">

                                        <label>Due Date</label>

                                        <input
                                            type="date"
                                            name="dueDate"
                                            value={formData.dueDate}
                                            onChange={handleInputChange}
                                        />

                                    </div>

                                    {/* Form error */}
                                    {formError && (
                                        <p className="task-form-error">
                                            {formError}
                                        </p>
                                    )}

                                    {/* Buttons */}
                                    <div className="task-form-actions">

                                        <button
                                            type="button"
                                            className="cancel-task-button"
                                            onClick={() => setShowTaskForm(false)}
                                            disabled={submitting}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="add-task-button"
                                            disabled={submitting}
                                        >
                                            <Plus size={17} />
                                            {submitting
                                                ? "Creating..."
                                                : "Create Task"}
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    )}

                    {/* Footer */}
                    <footer className="dashboard-footer">
                        Made for better productivity
                        <span> ✦ </span>
                        TaskFlow
                    </footer>

                </div>

            </main>

        </div>
    );
};

export default Dashboard;
