import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService"; 
import "../../styles/Auth.css"

function Login({ setIsAuthenticated }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    { 
      email: "", 
      password: "" 
    }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, 
      [e.target.name]: e.target.value 
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await login(formData.email.trim(), formData.password);

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      setIsAuthenticated(true);
      navigate("/institution/dashboard");
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-card-header">
          <span className="auth-brand">Campus Feedbacks</span>
          <h2>Welcome back</h2>
          <p>Sign in to access your institution</p>
        </div>

        {error && <div className="alert alert-danger auth-alert">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email" name="email" type="email"
              className="form-control" placeholder="you@example.com"
              value={formData.email} onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password" name="password"
                type={showPassword ? "text" : "password"}
                className="form-control" placeholder="••••••••"
                value={formData.password} onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button" className="toggle-pwd"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Signing in…</>
              : "Sign in"
            }
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;