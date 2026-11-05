
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail, Lock, ArrowRight, Check,
    Eye, EyeOff
} from "lucide-react";

import { loginUser } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await loginUser(formData);
            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="tf-auth">
            <div className="tf-glow tf-glow-one"></div>
            <div className="tf-glow tf-glow-two"></div>

            <div className="tf-auth-card">

                {/* Branding panel */}
                <section className="tf-visual">
                    <div className="tf-brand">
                        <div className="tf-brand-icon">
                            <Check size={24} strokeWidth={3} />
                        </div>
                        Task<span>Flow</span>
                    </div>

                    <div>
                        <div className="tf-hero">
                            <div className="tf-eyebrow">
                                <span className="tf-eyebrow-dot"></span>
                                WELCOME BACK
                            </div>

                            <h1>
                                Make every day{" "}
                                <span className="tf-gradient">
                                    count.
                                </span>
                            </h1>

                            <p>
                                Your goals are waiting. Sign in to
                                manage your work, stay focused and
                                keep moving forward.
                            </p>
                        </div>

                        {/* Decorative dashboard preview */}
                        <div className="tf-preview">
                            <div className="tf-preview-top">
                                <span>Productivity overview</span>
                                <span className="tf-preview-label">
                                    THIS WEEK
                                </span>
                            </div>

                            <div className="tf-preview-stats">
                                <div className="tf-preview-stat">
                                    <strong>12</strong>
                                    <small>Tasks completed</small>
                                </div>

                                <div className="tf-preview-stat">
                                    <strong>08</strong>
                                    <small>Tasks remaining</small>
                                </div>
                            </div>

                            <div className="tf-preview-task">
                                <span className="tf-task-check">
                                    <Check size={11} />
                                </span>
                                Complete project planning
                            </div>

                            <div className="tf-preview-task">
                                <span className="tf-task-check">
                                    <Check size={11} />
                                </span>
                                Organize daily priorities
                            </div>
                        </div>
                    </div>

                    <div className="tf-visual-footer">
                        © 2026 TaskFlow · Organize. Focus. Achieve.
                    </div>
                </section>

                {/* Login form */}
                <section className="tf-form-section">
                    <div className="tf-form">

                        <h2>Welcome back</h2>
                        <p className="tf-form-description">
                            Sign in to continue to your workspace.
                        </p>

                        {error && (
                            <div className="tf-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="tf-field">
                                <label htmlFor="login-email">
                                    Email address
                                </label>

                                <div className="tf-input">
                                    <Mail size={18} />

                                    <input
                                        id="login-email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="tf-field">
                                <label htmlFor="login-password">
                                    Password
                                </label>

                                <div className="tf-input">
                                    <Lock size={18} />

                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="tf-password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword
                                            ? <EyeOff size={17} />
                                            : <Eye size={17} />
                                        }
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="tf-submit"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                                {!loading && <ArrowRight size={17} />}
                            </button>

                        </form>

                        <p className="tf-switch">
                            Don't have an account?{" "}
                            <Link to="/register">Create account</Link>
                        </p>

                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;
